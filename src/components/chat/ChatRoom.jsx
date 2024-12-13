import { useState, useEffect, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Send, ArrowLeft } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { fetchChatRoom, sendMessage } from "../../lib/chat";
import { supabase } from "../../lib/supabase";
import ChatMessage from "./ChatMessage";
import ChatHeader from "./ChatHeader";

const ChatRoom = () => {
	const { roomId } = useParams();
	const { user } = useAuth();
	const navigate = useNavigate();
	const [messages, setMessages] = useState([]);
	const [newMessage, setNewMessage] = useState("");
	const [loading, setLoading] = useState(true);
	const [sending, setSending] = useState(false);
	const [error, setError] = useState(null);
	const [room, setRoom] = useState(null);
	const messagesEndRef = useRef(null);

	useEffect(() => {
		loadChatRoom();
		const subscription = subscribeToMessages();
		return () => subscription.unsubscribe();
	}, [roomId]);

	useEffect(() => {
		scrollToBottom();
	}, [messages]);

	const loadChatRoom = async () => {
		try {
			setLoading(true);
			setError(null);

			const { data, error } = await fetchChatRoom(roomId, user.id);
			if (error) throw error;

			setRoom(data);

			// Fetch messages
			const { data: messagesData } = await supabase
				.from("chat_messages")
				.select("*")
				.eq("room_id", roomId)
				.order("created_at", { ascending: true });

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

	return (
		<div className="flex flex-col h-[calc(100vh-4rem)]">
			{/* Header */}
			<div className="bg-base-100 border-b border-base-200 p-4">
				<div className="flex items-center gap-4">
					<Link to="/messages" className="btn btn-ghost btn-sm">
						<ArrowLeft className="w-4 h-4" />
					</Link>
					<div>
						<h2 className="font-semibold">
							{otherUser?.first_name} {otherUser?.last_name}
						</h2>
						{listing && (
							<Link
								to={`/listings/${listing.id}`}
								className="text-sm text-base-content/70 hover:text-primary"
							>
								{listing.title}
							</Link>
						)}
					</div>
				</div>
			</div>

			{/* Messages */}
			<div className="flex-1 overflow-y-auto p-4 space-y-4">
				{messages.map((message) => (
					<div
						key={message.id}
						className={`flex ${
							message.sender_id === user.id
								? "justify-end"
								: "justify-start"
						}`}
					>
						<div
							className={`max-w-[70%] rounded-lg px-4 py-2 ${
								message.sender_id === user.id
									? "bg-primary text-primary-content"
									: "bg-base-200"
							}`}
						>
							<p>{message.content}</p>
							<span className="text-xs opacity-70">
								{new Date(
									message.created_at
								).toLocaleTimeString([], {
									hour: "2-digit",
									minute: "2-digit",
								})}
							</span>
						</div>
					</div>
				))}
				<div ref={messagesEndRef} />
			</div>

			{/* Message Input */}
			<form
				onSubmit={sendMessage}
				className="p-4 bg-base-100 border-t border-base-200"
			>
				<div className="join w-full">
					<input
						type="text"
						value={newMessage}
						onChange={(e) => setNewMessage(e.target.value)}
						placeholder="Type a message..."
						className="input input-bordered join-item w-full"
					/>
					<button
						type="submit"
						disabled={!newMessage.trim() || sending}
						className="btn btn-primary join-item"
					>
						{sending ? (
							<span className="loading loading-spinner loading-sm"></span>
						) : (
							<Send className="w-4 h-4" />
						)}
					</button>
				</div>
			</form>
		</div>
	);
};

export default ChatRoom;
