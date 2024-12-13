import MainLayout from "../layouts/MainLayout";
import ChatRoom from "../components/chat/ChatRoom";

const ChatRoomPage = () => {
	return (
		<MainLayout>
			<div className="min-h-screen bg-base-200">
				<div className="max-w-4xl mx-auto bg-base-100 min-h-screen shadow-xl">
					<ChatRoom />
				</div>
			</div>
		</MainLayout>
	);
};

export default ChatRoomPage;
