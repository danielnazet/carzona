import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import MainLayout from "../layouts/MainLayout";
import {
	Car,
	MapPin,
	Calendar,
	Gauge,
	Phone,
	Mail,
	User,
	ArrowLeft,
	Zap,
} from "lucide-react";
import { formatDistance, formatPrice } from "../lib/constants";

const ListingDetails = () => {
	const { id } = useParams();
	const [listing, setListing] = useState(null);
	const [seller, setSeller] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [currentImageIndex, setCurrentImageIndex] = useState(0);

	useEffect(() => {
		fetchListingDetails();
	}, [id]);

	const fetchListingDetails = async () => {
		try {
			const { data: listingData, error: listingError } = await supabase
				.from("car_listings")
				.select(
					`
          *,
          car_images (
            image_url,
            position
          )
        `
				)
				.eq("id", id)
				.single();

			if (listingError) throw listingError;
			setListing(listingData);

			if (listingData?.user_id) {
				const { data: sellerData, error: sellerError } = await supabase
					.from("profiles")
					.select("first_name, last_name, phone, email")
					.eq("id", listingData.user_id)
					.maybeSingle();

				if (sellerError) {
					console.error("Error fetching seller:", sellerError);
					setSeller({
						first_name: "Private",
						last_name: "Seller",
						phone: "Contact via email",
						email: "private@example.com",
					});
				} else {
					setSeller(
						sellerData || {
							first_name: "Private",
							last_name: "Seller",
							phone: "Contact via email",
							email: "private@example.com",
						}
					);
				}
			}
		} catch (err) {
			console.error("Error fetching listing:", err);
			setError("Failed to load listing details");
		} finally {
			setLoading(false);
		}
	};

	if (loading) {
		return (
			<MainLayout>
				<div className="min-h-screen bg-base-200 flex items-center justify-center">
					<span className="loading loading-spinner loading-lg text-primary"></span>
				</div>
			</MainLayout>
		);
	}

	if (error || !listing) {
		return (
			<MainLayout>
				<div className="min-h-screen bg-base-200 p-8">
					<div className="max-w-3xl mx-auto text-center">
						<h2 className="text-2xl font-bold mb-4">Error</h2>
						<p className="text-base-content/70 mb-6">
							{error || "Listing not found"}
						</p>
						<Link to="/" className="btn btn-primary">
							Return to Home
						</Link>
					</div>
				</div>
			</MainLayout>
		);
	}

	const images = listing.car_images || [];

	return (
		<MainLayout>
			<div className="min-h-screen bg-base-200 py-8 px-4 sm:px-6 lg:px-8">
				<div className="max-w-7xl mx-auto">
					<Link to="/" className="btn btn-ghost mb-6">
						<ArrowLeft className="w-4 h-4 mr-2" />
						Back to Listings
					</Link>

					<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
						{/* Main Content */}
						<div className="lg:col-span-2 space-y-6">
							{/* Image Gallery */}
							<div className="card bg-base-100 shadow-xl">
								<figure className="relative h-[400px]">
									<img
										src={
											images[currentImageIndex]
												?.image_url ||
											"https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80"
										}
										alt={listing.title}
										className="w-full h-full object-cover"
									/>
									{images.length > 1 && (
										<div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
											{images.map((_, index) => (
												<button
													key={index}
													onClick={() =>
														setCurrentImageIndex(
															index
														)
													}
													className={`w-3 h-3 rounded-full ${
														index ===
														currentImageIndex
															? "bg-primary"
															: "bg-base-100"
													}`}
												/>
											))}
										</div>
									)}
								</figure>
								{images.length > 1 && (
									<div className="p-4 flex gap-4 overflow-x-auto">
										{images.map((image, index) => (
											<button
												key={index}
												onClick={() =>
													setCurrentImageIndex(index)
												}
												className={`relative flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden ${
													index === currentImageIndex
														? "ring-2 ring-primary"
														: ""
												}`}
											>
												<img
													src={image.image_url}
													alt={`View ${index + 1}`}
													className="w-full h-full object-cover"
												/>
											</button>
										))}
									</div>
								)}
							</div>

							{/* Vehicle Details */}
							<div className="card bg-base-100 shadow-xl">
								<div className="card-body">
									<h1 className="text-3xl font-bold mb-2">
										{listing.title}
									</h1>
									<p className="text-3xl text-primary font-bold mb-6">
										{formatPrice(listing.price)}
									</p>

									<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
										<div className="flex items-center gap-2">
											<Calendar className="w-5 h-5 text-base-content/70" />
											<span>{listing.year}</span>
										</div>
										<div className="flex items-center gap-2">
											<Gauge className="w-5 h-5 text-base-content/70" />
											<span>
												{formatDistance(
													listing.kilometers
												)}
											</span>
										</div>
										<div className="flex items-center gap-2">
											<Car className="w-5 h-5 text-base-content/70" />
											<span className="capitalize">
												{listing.transmission}
											</span>
										</div>
										<div className="flex items-center gap-2">
											<Zap className="w-5 h-5 text-base-content/70" />
											<span>{listing.horsepower} KM</span>
										</div>
									</div>
									<div className="divider"></div>

									<h2 className="text-xl font-semibold mb-4">
										Vehicle Specifications
									</h2>
									<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
										<div>
											<p className="text-sm text-base-content/70">
												Make
											</p>
											<p className="font-medium">
												{listing.make}
											</p>
										</div>
										<div>
											<p className="text-sm text-base-content/70">
												Model
											</p>
											<p className="font-medium">
												{listing.model}
											</p>
										</div>
										<div>
											<p className="text-sm text-base-content/70">
												Body Type
											</p>
											<p className="font-medium capitalize">
												{listing.body_type}
											</p>
										</div>
										<div>
											<p className="text-sm text-base-content/70">
												Fuel Type
											</p>
											<p className="font-medium capitalize">
												{listing.fuel_type}
											</p>
										</div>
										<div>
											<p className="text-sm text-base-content/70">
												Color
											</p>
											<p className="font-medium">
												{listing.color}
											</p>
										</div>
										<div>
											<p className="text-sm text-base-content/70">
												Location
											</p>
											<p className="font-medium">
												{listing.location}
											</p>
										</div>
										<div>
											<p className="text-sm text-base-content/70">
												Condition:
											</p>
											<p className="font-medium">
												{listing.condition}
											</p>
										</div>
										<div>
											<p className="text-sm text-base-content/70">
												VIN:
											</p>
											<p className="font-medium">
												{listing.vin}
											</p>
										</div>
									</div>
									<div className="divider"></div>
									<h2 className="text-xl font-semibold mb-4">
										Description
									</h2>
									<p className="whitespace-pre-line text-base-content/80">
										{listing.description}
									</p>
								</div>
							</div>
						</div>

						{/* Sidebar */}
						<div className="space-y-6">
							{/* Seller Information */}
							{seller && (
								<div className="card bg-base-100 shadow-xl">
									<div className="card-body">
										<h2 className="text-xl font-semibold mb-4">
											Seller Information
										</h2>
										<div className="flex items-center gap-3 mb-4">
											<div className="avatar placeholder">
												<div className="w-12 h-12 rounded-full bg-primary/10">
													<User className="w-6 h-6 text-primary" />
												</div>
											</div>
											<div>
												<p className="font-medium">
													{seller.first_name}{" "}
													{seller.last_name}
												</p>
												<p className="text-sm text-base-content/70">
													Private Seller
												</p>
											</div>
										</div>

										<div className="space-y-3">
											<a
												href={`tel:${seller.phone}`}
												className="btn btn-primary btn-block"
											>
												<Phone className="w-4 h-4 mr-2" />
												Call Seller
											</a>
											<a
												href={`mailto:${seller.email}`}
												className="btn btn-outline btn-block"
											>
												<Mail className="w-4 h-4 mr-2" />
												Email Seller
											</a>
										</div>
									</div>
								</div>
							)}

							{/* Safety Tips */}
							<div className="card bg-base-100 shadow-xl">
								<div className="card-body">
									<h2 className="text-xl font-semibold mb-4">
										Safety Tips
									</h2>
									<ul className="space-y-2 text-sm text-base-content/70">
										<li>
											• Meet in a safe, public location
										</li>
										<li>• Don't make wire transfers</li>
										<li>
											• Inspect the vehicle before buying
										</li>
										<li>• Verify all documentation</li>
										<li>
											• Consider a professional inspection
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</MainLayout>
	);
};

export default ListingDetails;
