import { Car, Facebook, Instagram, Youtube } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
	return (
		<footer className="footer p-10 bg-neutral text-neutral-content">
			<div>
				<div className="flex items-center gap-2">
					<Car className="w-8 h-8" />
					<p className="font-bold text-xl">Carzone</p>
				</div>
				<p>Zapewniamy niezawodny rynek samochodowy od 2024 roku</p>
			</div>

			<div>
				<span className="footer-title">Services</span>
				<Link to="/browse" className="link link-hover">
					Buy a Car
				</Link>
				<Link to="/browse" className="link link-hover">
					Sell a Car
				</Link>
				<Link to="/finance" className="link link-hover">
					Car Finance
				</Link>
				<Link to="/insurance" className="link link-hover">
					Car Insurance
				</Link>
			</div>

			<div>
				<span className="footer-title">Firma</span>
				<Link to="/about-us" className="link link-hover">
					O nas
				</Link>
				<Link to="/contact" className="link link-hover">
					Kontakt
				</Link>
				<Link to="/careers" className="link link-hover">
					Careers
				</Link>
				<Link to="/press" className="link link-hover">
					Press kit
				</Link>
			</div>

			<div>
				<span className="footer-title">Social</span>
				<div className="grid grid-flow-col gap-4">
					<a className="hover:text-primary">
						<Facebook />
					</a>
					<a className="hover:text-primary">
						<Instagram />
					</a>
					<a className="hover:text-primary">
						<Youtube />
					</a>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
