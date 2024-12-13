const ChatMessage = ({ message, isOwnMessage }) => {
	return (
		<div
			className={`flex ${isOwnMessage ? "justify-end" : "justify-start"}`}
		>
			<div
				className={`max-w-[70%] rounded-lg px-4 py-2 ${
					isOwnMessage
						? "bg-primary text-primary-content"
						: "bg-base-200"
				}`}
			>
				<p>{message.content}</p>
				<span className="text-xs opacity-70">
					{new Date(message.created_at).toLocaleTimeString([], {
						hour: "2-digit",
						minute: "2-digit",
					})}
				</span>
			</div>
		</div>
	);
};

export default ChatMessage;
