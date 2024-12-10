import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
	Car,
	Search,
	MapPin,
	Heart,
	User,
	Plus,
	LogOut,
	Settings,
	FileText,
} from "lucide-react";
import { supabase } from "./../../lib/supabase";

const Navbar = () => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		// Get initial auth state
		supabase.auth.getSession().then(({ data: { session } }) => {
			setUser(session?.user ?? null);
			setLoading(false);
		});

		// Listen for auth changes
		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((_event, session) => {
			setUser(session?.user ?? null);
		});

		return () => subscription.unsubscribe();
	}, []);

	const handleSignOut = async () => {
		try {
			await supabase.auth.signOut();
			navigate("/");
		} catch (error) {
			console.error("Error signing out:", error);
		}
	};

	return (
		<nav className="bg-white border-b border-base-200">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex h-16 items-center justify-between gap-8">
					{/* Logo */}
					<Link
						to="/"
						className="flex items-center gap-2 text-xl font-medium"
					>
						<Car className="w-6 h-6 text-primary/80" />
						<span className="bg-gradient-to-r from-primary/90 to-primary bg-clip-text text-transparent">
							Carzona
						</span>
					</Link>

					{/* Main Navigation */}
					{user ? (
						<Link
							to="/create-listing"
							className="btn btn-primary btn-sm"
						>
							<Plus className="w-4 h-4 mr-1" /> Auto
						</Link>
					) : (
						<Link
							to="/login"
							className="hover:text-primary transition-colors"
						></Link>
					)}
					<div className="hidden lg:flex items-center gap-6 text-sm font-medium text-base-content/70">
						<Link
							to="/browse"
							className="hover:text-primary transition-colors"
						>
							Przeglądaj samochody
						</Link>

						<Link
							to="/auctions"
							className="hover:text-primary transition-colors"
						>
							Aukcje
						</Link>
					</div>

					{/* Search Bar */}
					<div className="flex-1 max-w-2xl hidden md:block">
						<div className="relative">
							<input
								type="text"
								placeholder="Szukaj auto"
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
								Lokalizacja
							</span>
						</button>

						{/* Saved */}
						<button className="btn btn-ghost btn-sm text-base-content/70">
							<Heart className="w-4 h-4" />
							<span className="hidden lg:inline text-sm">
								Ulubione
							</span>
						</button>

						{/* Auth Section */}
						{loading ? (
							<div className="w-8 h-8 animate-pulse bg-base-200 rounded-full"></div>
						) : user ? (
							<div className="dropdown dropdown-end">
								<label
									tabIndex={0}
									className="btn btn-ghost btn-circle avatar"
								>
									<div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
										<User className="w-9 h-8 text-primary" />
									</div>
								</label>
								<ul
									tabIndex={0}
									className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
								>
									<li>
										<Link
											to="/my-listings"
											className="flex items-center gap-2"
										>
											<FileText className="w-4 h-4" />
											My Listings
										</Link>
									</li>
									<li>
										<Link
											to="/settings"
											className="flex items-center gap-2"
										>
											<Settings className="w-4 h-4" />
											Settings
										</Link>
									</li>
									<li>
										<button
											onClick={handleSignOut}
											className="flex items-center gap-2 text-error"
										>
											<LogOut className="w-4 h-4" />
											Sign out
										</button>
									</li>
								</ul>
							</div>
						) : (
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
						)}
					</div>
				</div>
			</div>

			{/* Mobile Search (Visible only on mobile) */}
			<div className="md:hidden px-4 pb-3">
				<div className="relative">
					<input
						type="text"
						placeholder="Szukaj"
						className="input input-bordered w-full h-10 pl-10 pr-4 bg-base-100/50 text-sm"
					/>
					<Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-base-content/50" />
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
