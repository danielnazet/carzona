import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import { Car, MapPin, Calendar, Gauge } from "lucide-react";

const Hero = () => {
	const [latestListings, setLatestListings] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetchLatestListings();
	}, []);

	const fetchLatestListings = async () => {
		try {
			const { data, error } = await supabase
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
				.eq("status", "active")
				.order("created_at", { ascending: false })
				.limit(3);

			if (error) throw error;
			setLatestListings(data || []);
		} catch (err) {
			console.error("Error fetching listings:", err);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="relative">
			{/* Hero Background */}
			<div
				className="absolute inset-0 bg-cover bg-center"
				style={{
					backgroundImage:
						'url("https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80")',
				}}
			>
				<div className="absolute inset-0 bg-gradient-to-b from-base-200/95 to-base-200/70"></div>
			</div>

			{/* Hero Content */}
			<div className="relative">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
					<div className="text-center mb-12">
						<h1 className="text-4xl lg:text-5xl font-bold mb-4">
							Find Your Dream Car
						</h1>
						<p className="text-lg text-base-content/80 mb-8 max-w-2xl mx-auto">
							Browse through thousands of cars from trusted
							dealers and private sellers. Your perfect ride is
							just a click away.
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<Link to="/browse" className="btn btn-primary">
								Browse Cars
							</Link>
							<Link
								to="/create-listing"
								className="btn btn-outline btn-secondary"
							>
								Sell Your Car
							</Link>
						</div>
					</div>

					{/* Latest Listings */}
					<div className="mt-16">
						<h2 className="text-2xl font-bold mb-6 text-center">
							Latest Listings
						</h2>
						{loading ? (
							<div className="flex justify-center">
								<span className="loading loading-spinner loading-lg text-primary"></span>
							</div>
						) : (
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
								{latestListings.map((listing) => (
									<Link
										key={listing.id}
										to={`/listings/${listing.id}`}
										className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow"
									>
										<figure className="relative h-48">
											<img
												src={
													listing.car_images?.[0]
														?.image_url ||
													"https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80"
												}
												alt={listing.title}
												className="w-full h-full object-cover"
											/>
											<div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
												<p className="text-white font-semibold text-lg">
													$
													{Number(
														listing.price
													).toLocaleString()}
												</p>
											</div>
										</figure>
										<div className="card-body p-4">
											<h3 className="card-title text-lg">
												{listing.title}
											</h3>
											<div className="grid grid-cols-2 gap-2 mt-2 text-sm text-base-content/70">
												<div className="flex items-center gap-1">
													<Calendar className="w-4 h-4" />
													<span>{listing.year}</span>
												</div>
												<div className="flex items-center gap-1">
													<Gauge className="w-4 h-4" />
													<span>
														{listing.mileage.toLocaleString()}{" "}
														mi
													</span>
												</div>
												<div className="flex items-center gap-1">
													<Car className="w-4 h-4" />
													<span>
														{listing.transmission}
													</span>
												</div>
												<div className="flex items-center gap-1">
													<MapPin className="w-4 h-4" />
													<span>
														{listing.location}
													</span>
												</div>
											</div>
										</div>
									</Link>
								))}
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Hero;
