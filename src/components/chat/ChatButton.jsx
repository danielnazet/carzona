import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MessageCircle } from "lucide-react";
import { createChatRoom } from "../../lib/chat";
import PropTypes from "prop-types";

const ChatButton = ({ listing, sellerId }) => {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const handleStartChat = async () => {
		try {
			setLoading(true);
			setError(null);

			const { data, error: chatError } = await createChatRoom(
				listing.id,
				{ name: "Gość", email: "anonymous@example.com" },
				sellerId
			);

			if (chatError) throw chatError;
			if (!data?.id) throw new Error("Nie udało się utworzyć czatu");

			navigate(`/messages/${data.id}`, { replace: true });
		} catch (err) {
			console.error("Error starting chat:", err);
			setError(err.message || "Nie udało się rozpocząć czatu");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div>
			<button
				onClick={handleStartChat}
				disabled={loading}
				className={`btn btn-primary w-full ${error ? "btn-error" : ""}`}
			>
				{loading ? (
					<span className="loading loading-spinner loading-sm"></span>
				) : (
					<>
						<MessageCircle className="w-4 h-4 mr-2" />
						Wyślij wiadomość
					</>
				)}
			</button>
			{error && (
				<div className="alert alert-error mt-2">
					<span className="text-sm">{error}</span>
				</div>
			)}
		</div>
	);
};

ChatButton.propTypes = {
	listing: PropTypes.shape({
		id: PropTypes.string.isRequired,
	}).isRequired,
	sellerId: PropTypes.string.isRequired,
};

export default ChatButton;
