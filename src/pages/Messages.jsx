import MainLayout from "../layouts/MainLayout";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { fetchUserChats } from "../lib/chat";
import { format } from "date-fns";

const Messages = () => {
	const { user } = useAuth();
	const [chats, setChats] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		if (!user) return;
		loadUserChats();
	}, [user]);

	const loadUserChats = async () => {
		try {
			setLoading(true);
			setError(null);

			const { data, error } = await fetchUserChats(user.id);
			if (error) throw error;

			setChats(data || []);
		} catch (err) {
			console.error("Error fetching user chats:", err);
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	if (loading) {
		return (
			<MainLayout>
				<div className="min-h-screen bg-base-200 p-8">
					<div className="max-w-4xl mx-auto">
						<div className="flex justify-center">
							<span className="loading loading-spinner loading-lg text-primary"></span>
						</div>
					</div>
				</div>
			</MainLayout>
		);
	}

	return (
		<MainLayout>
			<div className="min-h-screen bg-base-200 p-8">
				<div className="max-w-4xl mx-auto">
					<h1 className="text-2xl font-bold mb-6">Messages</h1>

					{error && (
						<div className="alert alert-error mb-6">
							<p>{error}</p>
						</div>
					)}

					{chats.length === 0 ? (
						<div className="card bg-base-100 shadow-xl">
							<div className="card-body text-center">
								<h3 className="font-semibold mb-2">
									No messages yet
								</h3>
								<p className="text-base-content/70">
									Start browsing cars and message sellers to
									begin conversations
								</p>
								<Link
									to="/browse"
									className="btn btn-primary mt-4"
								>
									Browse Cars
								</Link>
							</div>
						</div>
					) : (
						<div className="card bg-base-100 shadow-xl divide-y">
							{chats.map((chat) => (
								<Link
									key={chat.id}
									to={`/messages/${chat.id}`}
									className="p-4 hover:bg-base-200 transition-colors block"
								>
									<div className="flex justify-between items-start">
										<div>
											<p className="font-medium">
												{chat.otherUser?.first_name}{" "}
												{chat.otherUser?.last_name}
											</p>
											<p className="text-sm text-primary">
												{chat.listing?.title}
											</p>
											{chat.lastMessage && (
												<p className="text-sm text-base-content/70 mt-1">
													{chat.lastMessage.content}
												</p>
											)}
										</div>
										{chat.lastMessage && (
											<span className="text-xs text-base-content/50">
												{format(
													new Date(
														chat.lastMessage.created_at
													),
													"PP"
												)}
											</span>
										)}
									</div>
								</Link>
							))}
						</div>
					)}
				</div>
			</div>
		</MainLayout>
	);
};

export default Messages;
