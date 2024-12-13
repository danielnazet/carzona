import MainLayout from "../layouts/MainLayout";
import ChatList from "../components/chat/ChatList";
import { MessageCircle } from "lucide-react";

const Messages = () => {
	return (
		<MainLayout>
			<div className="min-h-screen bg-base-200">
				<div className="max-w-4xl mx-auto bg-base-100 min-h-screen shadow-xl">
					<div className="p-4 border-b border-base-200">
						<div className="flex items-center gap-2">
							<MessageCircle className="w-5 h-5 text-primary" />
							<h1 className="text-xl font-bold">Messages</h1>
						</div>
					</div>

					<ChatList />
				</div>
			</div>
		</MainLayout>
	);
};

export default Messages;
