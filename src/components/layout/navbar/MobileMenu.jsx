import { Link } from "react-router-dom";
import { Search, FileText, Plus } from "lucide-react";

const MobileMenu = ({ isOpen, onClose, isAuthenticated }) => {
	if (!isOpen) return null;

	return (
		<div className="md:hidden border-t border-base-200 bg-white">
			<div className="px-4 py-3 space-y-3">
				<Link
					to="/browse"
					className="flex items-center gap-2 py-2 text-base-content/70"
					onClick={onClose}
				>
					<Search className="w-5 h-5" />
					Browse Cars
				</Link>
				<Link
					to="/auctions"
					className="flex items-center gap-2 py-2 text-base-content/70"
					onClick={onClose}
				>
					<FileText className="w-5 h-5" />
					Auctions
				</Link>
				{isAuthenticated && (
					<Link
						to="/create-listing"
						className="flex items-center gap-2 py-2 text-primary"
						onClick={onClose}
					>
						<Plus className="w-5 h-5" />
						Sell Your Car
					</Link>
				)}
			</div>
		</div>
	);
};

export default MobileMenu;
