import { useState, useEffect } from "react";
import { Clock } from "lucide-react";
import { LISTING_EXPIRATION_TIME } from "../../lib/constants";

const ExpirationStatus = ({ createdAt }) => {
	const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 });
	const [isExpired, setIsExpired] = useState(false);

	useEffect(() => {
		const calculateTimeLeft = () => {
			const created = new Date(createdAt).getTime();
			const expiresAt = created + LISTING_EXPIRATION_TIME;
			const now = Date.now();
			const difference = expiresAt - now;

			if (difference <= 0) {
				setIsExpired(true);
				setTimeLeft({ days: 0, hours: 0, minutes: 0 });
				return;
			}

			const days = Math.floor(difference / (1000 * 60 * 60 * 24));
			const hours = Math.floor(
				(difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
			);
			const minutes = Math.floor(
				(difference % (1000 * 60 * 60)) / (1000 * 60)
			);

			setTimeLeft({ days, hours, minutes });
			setIsExpired(false);
		};

		calculateTimeLeft();
		const interval = setInterval(calculateTimeLeft, 60000); // Update every minute

		return () => clearInterval(interval);
	}, [createdAt]);

	if (isExpired) {
		return (
			<div className="flex items-center gap-2 text-error">
				<Clock className="w-4 h-4" />
				<span>Expired</span>
			</div>
		);
	}

	const formatTimeLeft = () => {
		const parts = [];

		if (timeLeft.days > 0) {
			parts.push(`${timeLeft.days}d`);
		}
		if (timeLeft.hours > 0 || timeLeft.days > 0) {
			parts.push(`${timeLeft.hours}h`);
		}
		parts.push(`${timeLeft.minutes}m`);

		return parts.join(" ");
	};

	return (
		<div className="flex items-center gap-2 text-warning">
			<Clock className="w-4 h-4" />
			<span>Expires in {formatTimeLeft()}</span>
		</div>
	);
};

export default ExpirationStatus;
