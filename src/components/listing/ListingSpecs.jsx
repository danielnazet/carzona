import { Car, Calendar, Gauge, MapPin, Fuel, Zap } from "lucide-react";
import { formatDistance, formatPrice } from "../../lib/constants";

const ListingSpecs = ({ listing }) => {
	if (!listing) return null;

	return (
		<div className="card bg-base-100 shadow-xl">
			<div className="card-body">
				<div className="flex justify-between items-start">
					<div>
						<h1 className="text-3xl font-bold mb-2">
							{listing.title}
						</h1>
						<p className="text-3xl text-primary font-bold">
							{formatPrice(listing.price)}
						</p>
					</div>
				</div>

				<div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6 mt-6">
					<div className="flex items-center gap-2">
						<Calendar className="w-5 h-5 text-base-content/70" />
						<span>{listing.year}</span>
					</div>
					<div className="flex items-center gap-2">
						<Gauge className="w-5 h-5 text-base-content/70" />
						<span>{formatDistance(listing.kilometers)}</span>
					</div>
					<div className="flex items-center gap-2">
						<Car className="w-5 h-5 text-base-content/70" />
						<span className="capitalize">
							{listing.transmission}
						</span>
					</div>
					<div className="flex items-center gap-2">
						<Zap className="w-5 h-5 text-base-content/70" />
						<span>{listing.horsepower} HP</span>
					</div>
					<div className="flex items-center gap-2">
						<Fuel className="w-5 h-5 text-base-content/70" />
						<span className="capitalize">{listing.fuel_type}</span>
					</div>
					<div className="flex items-center gap-2">
						<MapPin className="w-5 h-5 text-base-content/70" />
						<span>{listing.location}</span>
					</div>
				</div>

				<div className="divider"></div>
				<h2 className="text-xl font-semibold mb-4">
					Specyfikacja pojazdu
				</h2>
				<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
					<div>
						<p className="text-sm text-base-content/70">Marka</p>
						<p className="font-medium">{listing.make}</p>
					</div>
					<div>
						<p className="text-sm text-base-content/70">Model</p>
						<p className="font-medium">{listing.model}</p>
					</div>
					<div>
						<p className="text-sm text-base-content/70">
							Typ nadwozia
						</p>
						<p className="font-medium capitalize">
							{listing.body_type}
						</p>
					</div>
					<div>
						<p className="text-sm text-base-content/70">
							Typ paliwa
						</p>
						<p className="font-medium capitalize">
							{listing.fuel_type}
						</p>
					</div>
					<div>
						<p className="text-sm text-base-content/70">
							Stan techniczny
						</p>
						<p className="font-medium capitalize">
							{listing.condition}
						</p>
					</div>
					<div>
						<p className="text-sm text-base-content/70">Kolor</p>
						<p className="font-medium">{listing.color}</p>
					</div>
					<div>
						<p className="text-sm text-base-content/70">VIN</p>
						<p className="font-medium">{listing.vin}</p>
					</div>
				</div>
				<div className="divider"></div>

				<h2 className="text-xl font-semibold mb-4">Opis</h2>
				<p className="whitespace-pre-line text-base-content/80">
					{listing.description}
				</p>
			</div>
		</div>
	);
};

export default ListingSpecs;
