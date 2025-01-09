import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Send, Image as ImageIcon } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { fetchChatRoom } from "../../lib/chat";
import { supabase } from "../../lib/supabase";
import { uploadImage } from "../../lib/supabase-storage";
import ChatMessage from "./ChatMessage";
import ChatHeader from "./ChatHeader";

const ChatRoom = () => {
	const { roomId } = useParams();
	const navigate = useNavigate();
	const [messages, setMessages] = useState([]);
	const [newMessage, setNewMessage] = useState("");
	const [selectedImage, setSelectedImage] = useState(null);
	const [sending, setSending] = useState(false);
	const [errorMessage, setErrorMessage] = useState(null);
	const [room, setRoom] = useState(null);
	const fileInputRef = useRef(null);
	const messagesEndRef = useRef(null);

	useEffect(() => {
		loadChatRoom();
		markMessagesAsRead();
		subscribeToNewMessages();
	}, [roomId]);

	const subscribeToNewMessages = () => {
		const subscription = supabase
			.channel("chat_updates")
			.on(
				"postgres_changes",
				{
					event: "INSERT",
					schema: "public",
					table: "chat_messages",
					filter: `room_id=eq.${roomId}`,
				},
				(payload) => {
					setMessages((current) => [...current, payload.new]);
					if (payload.new.sender_id !== user.id) {
						markMessageAsRead(payload.new.id);
					}
				}
			)
			.subscribe();

		return () => subscription.unsubscribe();
	};

	const markMessagesAsRead = async () => {
		await supabase
			.from("chat_messages")
			.update({ read: true })
			.eq("room_id", roomId)
			.eq("sender_id", user.id)
			.eq("read", false);
	};

	const markMessageAsRead = async (messageId) => {
		await supabase
			.from("chat_messages")
			.update({ read: true })
			.eq("id", messageId);
	};

	const loadChatRoom = async () => {
		try {
			const { data: roomData, error: roomError } = await fetchChatRoom(
				roomId,
				user.id
			);
			if (roomError) throw roomError;
			setRoom(roomData);

			const { data: messagesData } = await supabase
				.from("chat_messages")
				.select("*")
				.eq("room_id", roomId)
				.order("created_at", { ascending: true });

			setMessages(messagesData || []);
		} catch (err) {
			setErrorMessage(err.message);
			if (err.message === "Unauthorized access") {
				navigate("/messages");
			}
		}
	};

	const handleImageSelect = (e) => {
		const file = e.target.files[0];
		if (file && file.type.startsWith("image/")) {
			setSelectedImage(file);
		}
	};

	const handleSendMessage = async (e) => {
		e.preventDefault();
		if ((!newMessage.trim() && !selectedImage) || sending) return;

		try {
			setSending(true);
			let imageUrl = null;

			if (selectedImage) {
				imageUrl = await uploadImage(selectedImage, `chats/${roomId}`);
			}

			const { error } = await sendMessage(
				roomId,
				newMessage.trim(),
				"Gość"
			);
			if (error) throw error;

			setNewMessage("");
			setSelectedImage(null);
			if (fileInputRef.current) {
				fileInputRef.current.value = "";
			}
		} catch (error) {
			setErrorMessage("Failed to send message");
			console.error("Error sending message:", error);
		} finally {
			setSending(false);
		}
	};

	return (
		<div className="flex flex-col h-screen">
			{room && (
				<ChatHeader
					otherUser={
						room.buyer_id === user.id ? room.seller : room.buyer
					}
					listing={room.listing}
				/>
			)}

			<div className="flex-1 overflow-y-auto p-4 space-y-4">
				{messages.map((message) => (
					<ChatMessage
						key={message.id}
						message={message}
						isOwnMessage={message.sender_id === user.id}
					/>
				))}
				<div ref={messagesEndRef} />
			</div>

			<form
				onSubmit={handleSendMessage}
				className="p-4 border-t bg-base-200"
			>
				<div className="flex items-center gap-2">
					<input
						type="file"
						accept="image/*"
						onChange={handleImageSelect}
						ref={fileInputRef}
						className="hidden"
					/>
					<button
						type="button"
						onClick={() => fileInputRef.current?.click()}
						className="btn btn-circle btn-ghost"
					>
						<ImageIcon className="w-5 h-5" />
					</button>
					<input
						type="text"
						value={newMessage}
						onChange={(e) => setNewMessage(e.target.value)}
						placeholder="Type a message..."
						className="input input-bordered flex-1"
					/>
					<button
						type="submit"
						className="btn btn-primary"
						disabled={sending}
					>
						<Send className="w-5 h-5" />
					</button>
				</div>
				{selectedImage && (
					<div className="mt-2 flex items-center gap-2">
						<span className="text-sm">
							Selected image: {selectedImage.name}
						</span>
						<button
							type="button"
							onClick={() => setSelectedImage(null)}
							className="btn btn-ghost btn-xs"
						>
							Remove
						</button>
					</div>
				)}
			</form>

			{errorMessage && (
				<div className="alert alert-error">
					<span>{errorMessage}</span>
				</div>
			)}
		</div>
	);
};

export default ChatRoom;
