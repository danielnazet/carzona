import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { User, FileText, Settings, LogOut, MessageSquare } from "lucide-react";
import { supabase } from "../../../lib/supabase";

const UserMenu = ({ onSignOut }) => {
	const [unreadCount, setUnreadCount] = useState(0);

	useEffect(() => {
		fetchUnreadCount();
		subscribeToMessages();
	}, []);

	const fetchUnreadCount = async () => {
		const {
			data: { user },
		} = await supabase.auth.getUser();
		if (!user) return;

		const { count } = await supabase
			.from("chat_messages")
			.select("*", { count: "exact" })
			.eq("read", false)
			.neq("sender_id", user.id);

		setUnreadCount(count || 0);
	};

	const subscribeToMessages = () => {
		const subscription = supabase
			.channel("messages_count")
			.on(
				"postgres_changes",
				{
					event: "*",
					schema: "public",
					table: "chat_messages",
				},
				() => {
					fetchUnreadCount();
				}
			)
			.subscribe();

		return () => subscription.unsubscribe();
	};

	return (
		<div className="dropdown dropdown-end">
			<label tabIndex={0} className="btn btn-ghost p-0">
				<div className="w-10 h-10 bg-primary/10 flex items-center justify-center">
					<User className="w-5 h-5 text-primary" />
				</div>
			</label>
			<ul
				tabIndex={0}
				className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
			>
				<li>
					<Link
						to="/my-listings"
						className="flex items-center gap-2 py-3"
					>
						<FileText className="w-4 h-4" />
						Moje ogloszenia
					</Link>
				</li>
				<li>
					<Link
						to="/messages"
						className="flex items-center gap-2 py-3"
					>
						<MessageSquare className="w-4 h-4" />
						<span>Wiadomosci</span>
						{unreadCount > 0 && (
							<span className="badge badge-primary badge-sm">
								{unreadCount}
							</span>
						)}
					</Link>
				</li>
				<li>
					<Link
						to="/settings"
						className="flex items-center gap-2 py-3"
					>
						<Settings className="w-4 h-4" />
						Ustawienia
					</Link>
				</li>
				<li>
					<button
						onClick={onSignOut}
						className="flex items-center gap-2 py-3 text-error"
					>
						<LogOut className="w-4 h-4" />
						Wyloguj
					</button>
				</li>
			</ul>
		</div>
	);
};

export default UserMenu;
