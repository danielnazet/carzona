import { useState, useEffect } from "react";
import { AlertCircle, Clock, RefreshCw } from "lucide-react";
import { LISTING_EXPIRATION_TIME } from "../../lib/constants";
import { republishListing } from "../../lib/listing-cleanup";

const CleanupStatus = ({ listingId, createdAt, onRepublish }) => {
	const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0 });
	const [isExpired, setIsExpired] = useState(false);
	const [isRepublishing, setIsRepublishing] = useState(false);

	useEffect(() => {
		const calculateTimeLeft = () => {
			const created = new Date(createdAt).getTime();
			const expiresAt = created + LISTING_EXPIRATION_TIME;
			const now = Date.now();
			const difference = expiresAt - now;

			if (difference <= 0) {
				setIsExpired(true);
				setTimeLeft({ hours: 0, minutes: 0 });
				return;
			}

			const hours = Math.floor(difference / (1000 * 60 * 60));
			const minutes = Math.floor(
				(difference % (1000 * 60 * 60)) / (1000 * 60)
			);

			setTimeLeft({ hours, minutes });
			setIsExpired(false);
		};

		calculateTimeLeft();
		const interval = setInterval(calculateTimeLeft, 60000); // Update every minute

		return () => clearInterval(interval);
	}, [createdAt]);

	const handleRepublish = async () => {
		setIsRepublishing(true);
		try {
			const { success } = await republishListing(listingId);
			if (success && onRepublish) {
				onRepublish();
			}
		} finally {
			setIsRepublishing(false);
		}
	};

	if (isExpired) {
		return (
			<div className="flex flex-col gap-2">
				<div className="flex items-center gap-2 text-error">
					<AlertCircle className="w-4 h-4" />
					<span>Listing expired</span>
				</div>
				<button
					onClick={handleRepublish}
					disabled={isRepublishing}
					className="btn btn-sm btn-outline btn-primary"
				>
					{isRepublishing ? (
						<>
							<RefreshCw className="w-4 h-4 animate-spin" />
							Republishing...
						</>
					) : (
						<>
							<RefreshCw className="w-4 h-4" />
							Republish Listing
						</>
					)}
				</button>
			</div>
		);
	}

	return (
		<div className="flex items-center gap-2 text-warning">
			<Clock className="w-4 h-4" />
			<span>
				Expires in {timeLeft.hours > 0 && `${timeLeft.hours}h `}
				{timeLeft.minutes}m
			</span>
		</div>
	);
};

export default CleanupStatus;
