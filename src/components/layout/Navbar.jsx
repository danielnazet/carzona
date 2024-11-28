import { Link } from "react-router-dom";
import { Car, Search, MapPin, Heart, User } from "lucide-react";

const Navbar = () => {
	return (
		<nav className="bg-white border-b border-base-200">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex h-16 items-center justify-between gap-8">
					{/* Logo */}
					<Link
						to="/"
						className="flex items-center gap-2 text-xl font-medium"
					>
						<Car className="w-6 h-6 text-black" />
						<span className="bg-gradient-to-r from-primary/90 to-primary bg-clip-text text-black">
							CarZona
						</span>
					</Link>

					{/* Main Navigation */}
					<div className="hidden lg:flex items-center gap-6 text-sm font-medium text-base-content/70">
						<Link
							to="/browse"
							className="hover:text-primary transition-colors"
						>
							Browse Cars
						</Link>
						<Link
							to="/sell"
							className="hover:text-primary transition-colors"
						>
							Sell Car
						</Link>
						<Link
							to="/auctions"
							className="hover:text-primary transition-colors"
						>
							Auctions
						</Link>
					</div>

					{/* Search Bar */}
					<div className="flex-1 max-w-2xl hidden md:block">
						<div className="relative">
							<input
								type="text"
								placeholder="Search cars, brands, or models..."
								className="input input-bordered w-full h-10 pl-10 pr-4 bg-base-100/50 focus:bg-white text-sm border-base-200 focus:border-primary/30 focus:ring-1 focus:ring-primary/30"
							/>
							<Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-base-content/50" />
						</div>
					</div>

					{/* Right Section */}
					<div className="flex items-center gap-2 sm:gap-4">
						{/* Location */}
						<button className="btn btn-ghost btn-sm text-base-content/70 hidden sm:flex">
							<MapPin className="w-4 h-4" />
							<span className="hidden lg:inline text-sm">
								Location
							</span>
						</button>

						{/* Saved */}
						<button className="btn btn-ghost btn-sm text-base-content/70">
							<Heart className="w-4 h-4" />
							<span className="hidden lg:inline text-sm">
								Saved
							</span>
						</button>

						{/* Auth Buttons */}
						<div className="flex items-center gap-2">
							<Link
								to="/login"
								className="btn btn-ghost btn-sm text-base-content/90 hover:bg-base-200/70"
							>
								Sign in
							</Link>
							<Link
								to="/signup"
								className="btn btn-sm bg-primary/10 hover:bg-primary/20 text-primary border-0"
							>
								<User className="w-4 h-4" />
								<span className="hidden sm:inline">
									Register
								</span>
							</Link>
						</div>
					</div>
				</div>
			</div>

			{/* Mobile Search (Visible only on mobile) */}
			<div className="md:hidden px-4 pb-3">
				<div className="relative">
					<input
						type="text"
						placeholder="Search cars..."
						className="input input-bordered w-full h-10 pl-10 pr-4 bg-base-100/50 text-sm"
					/>
					<Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-base-content/50" />
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
