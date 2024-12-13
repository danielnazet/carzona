import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MessageCircle } from "lucide-react";
import { createChatRoom } from "../../lib/chat";
import { useAuth } from "../../hooks/useAuth";

const ChatButton = ({ listing, sellerId }) => {
	const { user } = useAuth();
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const handleStartChat = async () => {
		if (!user) {
			navigate("/login");
			return;
		}

		if (!listing?.id || !sellerId) {
			setError("Invalid listing or seller information");
			return;
		}

		try {
			setLoading(true);
			setError(null);

			const { data, error } = await createChatRoom(
				listing.id,
				user.id,
				sellerId
			);

			if (error) throw error;
			if (!data?.id) throw new Error("Failed to create chat room");

			navigate(`/messages/${data.id}`);
		} catch (err) {
			console.error("Error starting chat:", err);
			setError("Failed to start chat. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	if (user?.id === sellerId) return null;

	return (
		<div>
			<button
				onClick={handleStartChat}
				disabled={loading}
				className="btn btn-primary w-full"
			>
				{loading ? (
					<span className="loading loading-spinner loading-sm"></span>
				) : (
					<>
						<MessageCircle className="w-4 h-4 mr-2" />
						Message Seller
					</>
				)}
			</button>
			{error && <p className="text-sm text-error mt-2">{error}</p>}
		</div>
	);
};

export default ChatButton;
