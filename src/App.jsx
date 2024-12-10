import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { startCleanupInterval } from "./lib/listing-cleanup";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Welcome from "./pages/Welcome";
import Browse from "./pages/Browse";
import CreateListing from "./pages/CreateListing";
import ListingSuccess from "./pages/ListingSuccess";
import MyListings from "./pages/MyListings";
import ListingDetails from "./pages/ListingDetails";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";

function App() {
	useEffect(() => {
		// Start the cleanup interval when the app loads
		const cleanup = startCleanupInterval();
		return cleanup;
	}, []);

	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<Register />} />
				<Route path="/welcome" element={<Welcome />} />
				<Route path="/browse" element={<Browse />} />
				<Route path="/create-listing" element={<CreateListing />} />
				<Route path="/listing-success" element={<ListingSuccess />} />
				<Route path="/my-listings" element={<MyListings />} />
				<Route path="/listings/:id" element={<ListingDetails />} />
				<Route path="/about-us" element={<AboutUs />} />
				<Route path="/contact" element={<Contact />} />
			</Routes>
		</Router>
	);
}

export default App;
