import { Link } from "react-router-dom";

const DesktopNav = () => {
	return (
		<div className="hidden md:flex items-center gap-8">
			<Link
				to="/browse"
				className="text-base-content/70 hover:text-primary transition-colors"
			>
				Browse Cars
			</Link>
			<Link
				to="/auctions"
				className="text-base-content/70 hover:text-primary transition-colors"
			>
				Auctions
			</Link>
		</div>
	);
};

export default DesktopNav;
