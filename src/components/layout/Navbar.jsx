import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heart, User, Menu, X, Plus } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { supabase } from "../../lib/supabase";
import Logo from "./navbar/Logo";
import DesktopNav from "./navbar/DesktopNav";
import UserMenu from "./navbar/UserMenu";
import MobileMenu from "./navbar/MobileMenu";
import SearchBar from "./navbar/Searchbar";

const Navbar = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const { user, loading } = useAuth();
	const navigate = useNavigate();

	const handleSignOut = async () => {
		try {
			await supabase.auth.signOut();
			navigate("/");
		} catch (error) {
			console.error("Error signing out:", error);
		}
	};

	return (
		<nav className="bg-white border-b border-base-200 sticky top-0 z-50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex h-16 items-center justify-between gap-4">
					<div className="flex items-center gap-4 lg:gap-8">
						<Logo />
						<DesktopNav />
					</div>

					{/* Search Bar */}
					<SearchBar />

					{/* Right Section */}
					<div className="flex items-center gap-2 sm:gap-4">
						{/* Favorites - Hidden on smallest screens */}
						<Link
							to="/favorites"
							className="btn btn-ghost btn-sm text-base-content/70 hidden sm:flex"
							title="Saved Cars"
						>
							<Heart className="w-5 h-5" />
							<span className="hidden lg:inline ml-2">
								Ulubione
							</span>
						</Link>

						{/* Sell Button - Hidden on mobile */}
						{user && (
							<Link
								to="/create-listing"
								className="btn btn-primary btn-sm hidden md:flex"
							>
								<Plus className="w-4 h-4 mr-1" />
								Sprzedaj
							</Link>
						)}

						{/* Auth Section */}
						{loading ? (
							<div className="w-8 h-8 animate-pulse bg-base-200"></div>
						) : user ? (
							<UserMenu onSignOut={handleSignOut} />
						) : (
							<div className="hidden sm:flex items-center gap-2">
								<Link
									to="/login"
									className="btn btn-ghost btn-sm"
								>
									Zaloguj
								</Link>
								<Link
									to="/signup"
									className="btn btn-sm bg-primary/10 hover:bg-primary/20 text-primary border-0"
								>
									<User className="w-4 h-4 mr-2" />
									Rejestracja
								</Link>
							</div>
						)}

						{/* Mobile Menu Button */}
						<button
							onClick={() => setIsMenuOpen(!isMenuOpen)}
							className="btn btn-ghost btn-circle md:hidden"
						>
							{isMenuOpen ? (
								<X className="w-6 h-6" />
							) : (
								<Menu className="w-6 h-6" />
							)}
						</button>
					</div>
				</div>
			</div>

			<MobileMenu
				isOpen={isMenuOpen}
				onClose={() => setIsMenuOpen(false)}
				isAuthenticated={!!user}
				user={user}
			/>
		</nav>
	);
};

export default Navbar;
