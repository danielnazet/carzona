import { Check } from "lucide-react";

const ReviewListing = ({ formData, onSubmit, onBack }) => {
	const { vehicleDetails, listingDetails, media } = formData;

	return (
		<div className="space-y-8">
			{/* Vehicle Details Section */}
			<div>
				<h3 className="text-lg font-semibold mb-4">
					Szczegoly samochodu :
				</h3>
				<div className="grid grid-cols-2 gap-4">
					<div>
						<p className="text-sm text-base-content/70">Marka</p>
						<p className="font-medium">{vehicleDetails.make}</p>
					</div>
					<div>
						<p className="text-sm text-base-content/70">Model</p>
						<p className="font-medium">{vehicleDetails.model}</p>
					</div>
					<div>
						<p className="text-sm text-base-content/70">Rok</p>
						<p className="font-medium">{vehicleDetails.year}</p>
					</div>
					<div>
						<p className="text-sm text-base-content/70">Przebieg</p>
						<p className="font-medium">
							{vehicleDetails.kilometers}
						</p>
					</div>
					<div>
						<p className="text-sm text-base-content/70">
							Skrzynia biegow
						</p>
						<p className="font-medium capitalize">
							{vehicleDetails.transmission}
						</p>
					</div>
					<div>
						<p className="text-sm text-base-content/70">
							Rodzaj Paliwa
						</p>
						<p className="font-medium capitalize">
							{vehicleDetails.fuelType}
						</p>
					</div>
					<div>
						<p className="text-sm text-base-content/70">
							Typ nadwozia
						</p>
						<p className="font-medium capitalize">
							{vehicleDetails.bodyType}
						</p>
					</div>
					<div>
						<p className="text-sm text-base-content/70">Kolor</p>
						<p className="font-medium">{vehicleDetails.color}</p>
					</div>
				</div>
			</div>

			{/* Listing Details Section */}
			<div>
				<h3 className="text-lg font-semibold mb-4">
					Szczegoly ogloszenia
				</h3>
				<div className="space-y-4">
					<div>
						<p className="text-sm text-base-content/70">Tytul</p>
						<p className="font-medium">{listingDetails.title}</p>
					</div>
					<div>
						<p className="text-sm text-base-content/70">Opis</p>
						<p className="font-medium">
							{listingDetails.description}
						</p>
					</div>
					<div className="grid grid-cols-2 gap-4">
						<div>
							<p className="text-sm text-base-content/70">Cena</p>
							<p className="font-medium">
								{Number(listingDetails.price).toLocaleString()}{" "}
								PLN
							</p>
						</div>
						<div>
							<p className="text-sm text-base-content/70">
								Typ ogloszenia
							</p>
							<p className="font-medium capitalize">
								{listingDetails.listingType}
							</p>
						</div>
						<div>
							<p className="text-sm text-base-content/70">
								Lokalizacja
							</p>
							<p className="font-medium">
								{listingDetails.location}
							</p>
						</div>
						<div>
							<p className="text-sm text-base-content/70">
								Stan auta
							</p>
							<p className="font-medium capitalize">
								{listingDetails.condition}
							</p>
						</div>
					</div>
				</div>
			</div>

			{/* Photos Preview */}
			<div>
				<h3 className="text-lg font-semibold mb-4">Zdjecia</h3>
				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
					{media.map((image, index) => (
						<img
							key={index}
							src={image.preview}
							alt={`Vehicle ${index + 1}`}
							className="w-full h-48 object-cover rounded-lg"
						/>
					))}
				</div>
			</div>

			{/* Action Buttons */}
			<div className="flex justify-between pt-6">
				<button
					type="button"
					onClick={onBack}
					className="btn btn-ghost"
				>
					Powrot
				</button>
				<button
					type="button"
					onClick={onSubmit}
					className="btn btn-primary"
				>
					<Check className="w-4 h-4 mr-2" />
					Opublikuj
				</button>
			</div>
		</div>
	);
};

export default ReviewListing;
