import MainLayout from "../layouts/MainLayout";
import CarSearch from "../components/home/CarSearch";
import FeaturedAuctions from "../components/home/FeaturedAuctions";

const Home = () => {
	return (
		<MainLayout>
			<div className="min-h-screen bg-base-200">
				{/* Hero Section */}
				<div
					className="relative bg-cover bg-center py-20"
					style={{
						backgroundImage:
							'url("https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80")',
					}}
				>
					<div className="absolute inset-0 bg-gradient-to-b from-base-200/95 to-base-200/70"></div>
					<div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
						<h1 className="text-4xl lg:text-5xl font-bold mb-4">
							Znajdź Swój wymarzony samochód
						</h1>
						<p className="text-lg text-base-content/80 mb-8 max-w-2xl mx-auto">
							Przeglądaj tysiące samochodów od zaufanych dealerów
							i prywatnych sprzedawców. Twoje idealne auto jest na
							wyciągnięcie ręki
						</p>
					</div>
				</div>

				{/* Main Content */}
				<CarSearch />
				<FeaturedAuctions />
			</div>
		</MainLayout>
	);
};

export default Home;
