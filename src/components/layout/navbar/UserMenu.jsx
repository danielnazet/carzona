import { Link } from "react-router-dom";
import { User, FileText, Settings, LogOut } from "lucide-react";

const UserMenu = ({ onSignOut }) => {
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
						<FileList className="w-4 h-4" />
						Wiadomosci
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
