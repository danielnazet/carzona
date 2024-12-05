import { Link } from "react-router-dom";
import { AlertCircle, Car, MapPin, Calendar, Gauge } from "lucide-react";
import { formatPrice, formatDistance } from "../../lib/constants";

const ListingGrid = ({ listings, loading, error }) => {
	if (loading) {
		return (
			<div className="flex justify-center items-center min-h-[400px]">
				<span className="loading loading-spinner loading-lg text-primary"></span>
			</div>
		);
	}

	if (error) {
		return (
			<div className="card bg-base-100 shadow-xl">
				<div className="card-body items-center text-center py-12">
					<AlertCircle className="w-12 h-12 text-error mb-4" />
					<h3 className="text-xl font-semibold mb-2">
						Error Loading Listings
					</h3>
					<p className="text-base-content/70">{error}</p>
				</div>
			</div>
		);
	}

	if (listings.length === 0) {
		return (
			<div className="card bg-base-100 shadow-xl">
				<div className="card-body items-center text-center py-12">
					<Car className="w-16 h-16 text-base-content/20 mb-4" />
					<h3 className="text-xl font-semibold mb-2">
						No Listings Found
					</h3>
					<p className="text-base-content/70">
						Try adjusting your filters or search criteria
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{listings.map((listing) => (
				<Link
					key={listing.id}
					to={`/listings/${listing.id}`}
					className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow"
				>
					<figure className="relative h-48">
						<img
							src={
								listing.car_images?.[0]?.image_url ||
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
						<h3 className="card-title text-lg">{listing.title}</h3>
						<div className="grid grid-cols-2 gap-2 mt-2 text-sm text-base-content/70">
							<div className="flex items-center gap-1">
								<Calendar className="w-4 h-4" />
								<span>{listing.year}</span>
							</div>
							<div className="flex items-center gap-1">
								<Gauge className="w-4 h-4" />
								<span>
									{formatDistance(listing.kilometers)}
								</span>
							</div>
							<div className="flex items-center gap-1">
								<Car className="w-4 h-4" />
								<span className="capitalize">
									{listing.transmission}
								</span>
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
	);
};

export default ListingGrid;
