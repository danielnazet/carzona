import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { startCleanupInterval } from "./lib/listing-cleanup";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Welcome from "./pages/Welcome";
import Browse from "./pages/Browse";
import CreateListing from "./pages/CreateListing";
import EditListing from "./pages/EditListing";
import ListingSuccess from "./pages/ListingSuccess";
import MyListings from "./pages/MyListings";
import ListingDetails from "./pages/ListingDetails";
import Messages from "./pages/Messages";
import ChatRoom from "./pages/ChatRoom";

function App() {
	useEffect(() => {
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
				<Route path="/edit-listing/:id" element={<EditListing />} />
				<Route path="/listing-success" element={<ListingSuccess />} />
				<Route path="/my-listings" element={<MyListings />} />
				<Route path="/listings/:id" element={<ListingDetails />} />
				<Route path="/messages" element={<Messages />} />
				<Route path="/messages/:roomId" element={<ChatRoom />} />
			</Routes>
		</Router>
	);
}

export default App;
