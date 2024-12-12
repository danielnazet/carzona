import { Link } from "react-router-dom";
import { Search, FileText, Plus, LogIn, UserPlus, Heart } from "lucide-react";

const MobileMenu = ({ isOpen, onClose, isAuthenticated, user }) => {
	if (!isOpen) return null;

	return (
		<div className="md:hidden border-t border-base-200 bg-white">
			<div className="px-4 py-3 space-y-3">
				{/* Main Navigation */}
				<Link
					to="/browse"
					className="flex items-center gap-2 py-2 text-base-content/70"
					onClick={onClose}
				>
					<Search className="w-5 h-5" />
					Przegladaj Auta
				</Link>
				{/* <Link */}
				{/* to="/auctions" */}
				{/* className="flex items-center gap-2 py-2 text-base-content/70" */}
				{/* onClick={onClose} */}
				{/* > */}
				{/* <FileText className="w-5 h-5" /> */}
				{/* Auctions */}
				{/* </Link> */}

				{/* Saved Cars */}
				<Link
					to="/favorites"
					className="flex items-center gap-2 py-2 text-base-content/70"
					onClick={onClose}
				>
					<Heart className="w-5 h-5" />
					Ulubione
				</Link>

				{/* Auth Section */}
				{isAuthenticated ? (
					<Link
						to="/create-listing"
						className="flex items-center gap-2 py-2 text-primary font-medium"
						onClick={onClose}
					>
						<Plus className="w-5 h-5" />
						Sprzedaj
					</Link>
				) : (
					<div className="pt-2 border-t border-base-200 space-y-3">
						<Link
							to="/login"
							className="flex items-center gap-2 py-2 text-primary"
							onClick={onClose}
						>
							<LogIn className="w-5 h-5" />
							Zaloguj
						</Link>
						<Link
							to="/signup"
							className="flex items-center gap-2 py-2 font-medium"
							onClick={onClose}
						>
							<UserPlus className="w-5 h-5" />
							Stworz konto
						</Link>
					</div>
				)}
			</div>
		</div>
	);
};

export default MobileMenu;
