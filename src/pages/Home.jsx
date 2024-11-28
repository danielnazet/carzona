import MainLayout from "../layouts/MainLayout";
import Hero from "../components/home/Hero";
import FeaturedAuctions from "../components/home/FeaturedAuctions";
import CarSearch from "../components/home/CarSearch";

const Home = () => {
	return (
		<MainLayout>
			<Hero />
			<CarSearch />
			<FeaturedAuctions />
		</MainLayout>
	);
};

export default Home;
