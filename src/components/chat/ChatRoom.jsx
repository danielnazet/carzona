import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Send } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { fetchChatRoom, sendMessage } from "../../lib/chat";
import { supabase } from "../../lib/supabase";
import ChatMessage from "./ChatMessage";
import ChatHeader from "./ChatHeader";

const ChatRoom = () => {
	const { roomId } = useParams();
	const { user, loading: authLoading } = useAuth();
	const navigate = useNavigate();
	const [messages, setMessages] = useState([]);
	const [newMessage, setNewMessage] = useState("");
	const [loading, setLoading] = useState(true);
	const [sending, setSending] = useState(false);
	const [error, setError] = useState(null);
	const [room, setRoom] = useState(null);
	const messagesEndRef = useRef(null);

	useEffect(() => {
		if (authLoading) return;
		if (!user) {
			navigate("/login");
			return;
		}
		loadChatRoom();
	}, [user, authLoading, roomId]);

	useEffect(() => {
		if (messages.length > 0) {
			scrollToBottom();
		}
	}, [messages]);

	const loadChatRoom = async () => {
		try {
			setLoading(true);
			setError(null);

			const { data: roomData, error: roomError } = await fetchChatRoom(
				roomId,
				user.id
			);

			if (roomError) throw roomError;

			setRoom(roomData);

			const { data: messagesData, error: messagesError } = await supabase
				.from("chat_messages")
				.select("*")
				.eq("room_id", roomId)
				.order("created_at", { ascending: true });

			if (messagesError) throw messagesError;

			setMessages(messagesData || []);
		} catch (err) {
			console.error("Error loading chat:", err);
			setError(err.message);
			if (err.message === "Unauthorized access") {
				navigate("/messages");
			}
		} finally {
			setLoading(false);
		}
	};

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	const handleSendMessage = async (e) => {
		e.preventDefault();
		if (!newMessage.trim() || sending) return;

		try {
			setSending(true);
			const { error } = await sendMessage(roomId, user.id, newMessage);
			if (error) throw error;
			setNewMessage("");
		} catch (err) {
			console.error("Error sending message:", err);
		} finally {
			setSending(false);
		}
	};

	if (loading || authLoading) {
		return <div>Ładowanie...</div>;
	}

	if (error) {
		return <div>Błąd: {error}</div>;
	}

	const otherUser = room
		? room.buyer_id === user.id
			? room.seller
			: room.buyer
		: null;

	return (
		<div className="chat-room">
			{room && (
				<ChatHeader otherUser={otherUser} listing={room.listing} />
			)}
			<div className="chat-messages">
				{messages.map((message) => (
					<ChatMessage
						key={message.id}
						message={message}
						isOwnMessage={message.sender_id === user.id}
					/>
				))}
				<div ref={messagesEndRef}></div>
			</div>
			<form onSubmit={handleSendMessage} className="chat-input">
				<input
					type="text"
					placeholder="Type a message"
					value={newMessage}
					onChange={(e) => setNewMessage(e.target.value)}
				/>
				<button type="submit" disabled={!newMessage.trim() || sending}>
					<Send />
				</button>
			</form>
		</div>
	);
};

export default ChatRoom;
