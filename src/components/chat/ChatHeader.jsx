import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { formatPrice } from "../../lib/constants";

const ChatHeader = ({ listing, otherUser }) => {
	return (
		<div className="bg-base-100 border-b border-base-200 p-4">
			<div className="flex items-center gap-4">
				<Link to="/messages" className="btn btn-ghost btn-sm">
					<ArrowLeft className="w-4 h-4" />
				</Link>
				<div>
					<h2 className="font-semibold">
						{otherUser?.first_name} {otherUser?.last_name}
					</h2>
					{listing && (
						<div className="flex items-center gap-2">
							<Link
								to={`/listings/${listing.id}`}
								className="text-sm text-base-content/70 hover:text-primary"
							>
								{listing.title}
							</Link>
							<span className="text-sm font-medium text-primary">
								{formatPrice(listing.price)}
							</span>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default ChatHeader;
