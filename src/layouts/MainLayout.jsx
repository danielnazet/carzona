import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const MainLayout = ({ children }) => {
	return (
		<div className="min-h-screen flex flex-col">
			<Navbar />
			<main className="flex-grow">{children}</main>
			<Footer />
		</div>
	);
};

export default MainLayout;
