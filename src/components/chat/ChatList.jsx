import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../hooks/useAuth";
import { formatPrice } from "../../lib/constants";

const ChatList = () => {
	const { user } = useAuth();
	const [chats, setChats] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetchChats();
		const subscription = subscribeToUpdates();
		return () => subscription.unsubscribe();
	}, []);

	const fetchChats = async () => {
		try {
			const { data } = await supabase
				.from("chat_rooms")
				.select(
					`
          *,
          car_listings (
            id,
            title,
            price,
            car_images (
              image_url
            )
          ),
          buyer:profiles!chat_rooms_buyer_id_fkey (
            first_name,
            last_name
          ),
          seller:profiles!chat_rooms_seller_id_fkey (
            first_name,
            last_name
          ),
          chat_messages (
            content,
            created_at,
            sender_id
          )
        `
				)
				.or(`buyer_id.eq.${user.id},seller_id.eq.${user.id}`)
				.order("updated_at", { ascending: false });

			// Process the chats to include last message and other user's info
			const processedChats =
				data?.map((chat) => {
					const isUserBuyer = chat.buyer_id === user.id;
					const otherUser = isUserBuyer ? chat.seller : chat.buyer;
					const messages = chat.chat_messages || [];
					const lastMessage =
						messages.length > 0
							? messages[messages.length - 1]
							: null;

					return {
						...chat,
						otherUser,
						lastMessage,
					};
				}) || [];

			setChats(processedChats);
		} catch (error) {
			console.error("Error fetching chats:", error);
		} finally {
			setLoading(false);
		}
	};

	const subscribeToUpdates = () => {
		return supabase
			.channel("chat_updates")
			.on(
				"postgres_changes",
				{
					event: "*",
					schema: "public",
					table: "chat_messages",
				},
				() => {
					fetchChats();
				}
			)
			.subscribe();
	};

	if (loading) {
		return (
			<div className="flex justify-center items-center min-h-[400px]">
				<span className="loading loading-spinner loading-lg text-primary"></span>
			</div>
		);
	}

	if (chats.length === 0) {
		return (
			<div className="text-center py-12">
				<h3 className="text-lg font-semibold mb-2">No Messages Yet</h3>
				<p className="text-base-content/70">
					Start browsing cars and message sellers to begin
					conversations
				</p>
				<Link to="/browse" className="btn btn-primary mt-4">
					Browse Cars
				</Link>
			</div>
		);
	}

	return (
		<div className="divide-y divide-base-200">
			{chats.map((chat) => (
				<Link
					key={chat.id}
					to={`/messages/${chat.id}`}
					className="block hover:bg-base-200 transition-colors"
				>
					<div className="p-4 flex gap-4">
						<div className="w-20 h-20 flex-shrink-0">
							<img
								src={
									chat.car_listings.car_images[0]
										?.image_url ||
									"https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80"
								}
								alt={chat.car_listings.title}
								className="w-full h-full object-cover rounded-lg"
							/>
						</div>

						<div className="flex-1 min-w-0">
							<div className="flex justify-between items-start mb-1">
								<h3 className="font-semibold truncate">
									{chat.otherUser.first_name}{" "}
									{chat.otherUser.last_name}
								</h3>
								<span className="text-sm text-base-content/70">
									{chat.lastMessage &&
										new Date(
											chat.lastMessage.created_at
										).toLocaleDateString()}
								</span>
							</div>

							<p className="text-sm text-primary font-medium mb-1">
								{chat.car_listings.title} -{" "}
								{formatPrice(chat.car_listings.price)}
							</p>

							{chat.lastMessage && (
								<p className="text-sm text-base-content/70 truncate">
									{chat.lastMessage.sender_id === user.id
										? "You: "
										: ""}
									{chat.lastMessage.content}
								</p>
							)}
						</div>
					</div>
				</Link>
			))}
		</div>
	);
};

export default ChatList;
