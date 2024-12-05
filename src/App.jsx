import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Welcome from "./pages/Welcome";
import Browse from "./pages/Browse";
import CreateListing from "./pages/CreateListing";
import ListingSuccess from "./pages/ListingSuccess";
import MyListings from "./pages/MyListings";
import ListingDetails from "./pages/ListingDetails";

function App() {
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
			</Routes>
		</Router>
	);
}

export default App;
