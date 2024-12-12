import { Link } from "react-router-dom";
import { Car } from "lucide-react";

const Logo = () => {
	return (
		<Link to="/" className="flex items-center gap-2 text-xl font-medium">
			<Car className="w-6 h-6 text-primary" />
			<span className="bg-gradient-to-r from-primary/90 to-primary bg-clip-text text-transparent">
				Carzone
			</span>
		</Link>
	);
};

export default Logo;
