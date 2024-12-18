import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./../hooks/useAuth";
import { fetchUserChats } from "./../lib/chat";
import { format } from "date-fns";

const Messages = () => {
	const { user, loading: authLoading } = useAuth();
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

	if (authLoading || loading) {
		return <div>Ładowanie wiadomości...</div>;
	}

	if (error) {
		return <div>Błąd: {error}</div>;
	}

	if (chats.length === 0) {
		return <div>Brak wiadomości.</div>;
	}

	return (
		<div className="messages">
			<h1 className="text-xl font-bold mb-4">Twoje wiadomości</h1>
			<ul>
				{chats.map((chat) => (
					<li key={chat.id} className="p-4 border-b">
						<Link
							to={`/chat/${chat.id}`}
							className="flex items-center justify-between"
						>
							<div>
								<p className="font-bold">
									{chat.otherUser.email}
								</p>
								<p className="text-sm text-gray-500">
									{chat.lastMessage?.content ||
										"Brak wiadomości"}
								</p>
							</div>
							<div className="text-sm text-gray-400">
								{chat.lastMessage?.created_at
									? format(
											new Date(
												chat.lastMessage.created_at
											),
											"dd/MM/yyyy HH:mm"
									  )
									: ""}
							</div>
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Messages;
