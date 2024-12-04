import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Timer, Users, Gauge, MapPin } from "lucide-react";
import { supabase } from "../../lib/supabase";
import { formatPrice, formatDistance } from "../../lib/constants";

const FeaturedAuctions = () => {
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
		<section className="py-16 px-4 sm:px-8 bg-base-200">
			<div className="max-w-7xl mx-auto">
				<div className="text-center mb-12">
					<h2 className="text-4xl font-bold mb-4">
						Najnowsze ogłoszenia
					</h2>
					<p className="text-lg text-base-content/70">
						Sprawdź nasze najnowsze oferty samochodów
					</p>
				</div>

				{loading ? (
					<div className="flex justify-center">
						<span className="loading loading-spinner loading-lg text-primary"></span>
					</div>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
											{formatPrice(listing.price)}
										</p>
									</div>
								</figure>
								<div className="card-body p-4">
									<h3 className="card-title text-lg">
										{listing.title}
									</h3>
									<div className="grid grid-cols-2 gap-2 mt-2 text-sm text-base-content/70">
										<div className="flex items-center gap-1">
											<Timer className="w-4 h-4" />
											<span>{listing.year}</span>
										</div>
										<div className="flex items-center gap-1">
											<Gauge className="w-4 h-4" />
											<span>
												{formatDistance(
													listing.kilometers
												)}
											</span>
										</div>
										<div className="flex items-center gap-1">
											<Users className="w-4 h-4" />
											<span>{listing.transmission}</span>
										</div>
										<div className="flex items-center gap-1">
											<MapPin className="w-4 h-4" />
											<span>{listing.location}</span>
										</div>
									</div>
								</div>
							</Link>
						))}
					</div>
				)}

				<div className="text-center mt-12">
					<Link to="/browse" className="btn btn-outline btn-wide">
						Zobacz wszystkie ogłoszenia
					</Link>
				</div>
			</div>
		</section>
	);
};

export default FeaturedAuctions;
