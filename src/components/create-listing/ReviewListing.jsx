import { Check } from "lucide-react";

const ReviewListing = ({ formData, onSubmit, onBack }) => {
	const { vehicleDetails, listingDetails, media } = formData;

	return (
		<div className="space-y-8">
			{/* Vehicle Details Section */}
			<div>
				<h3 className="text-lg font-semibold mb-4">Vehicle Details</h3>
				<div className="grid grid-cols-2 gap-4">
					<div>
						<p className="text-sm text-base-content/70">Make</p>
						<p className="font-medium">{vehicleDetails.make}</p>
					</div>
					<div>
						<p className="text-sm text-base-content/70">Model</p>
						<p className="font-medium">{vehicleDetails.model}</p>
					</div>
					<div>
						<p className="text-sm text-base-content/70">Year</p>
						<p className="font-medium">{vehicleDetails.year}</p>
					</div>
					<div>
						<p className="text-sm text-base-content/70">Mileage</p>
						<p className="font-medium">
							{vehicleDetails.mileage} miles
						</p>
					</div>
					<div>
						<p className="text-sm text-base-content/70">
							Transmission
						</p>
						<p className="font-medium capitalize">
							{vehicleDetails.transmission}
						</p>
					</div>
					<div>
						<p className="text-sm text-base-content/70">
							Fuel Type
						</p>
						<p className="font-medium capitalize">
							{vehicleDetails.fuelType}
						</p>
					</div>
					<div>
						<p className="text-sm text-base-content/70">
							Body Type
						</p>
						<p className="font-medium capitalize">
							{vehicleDetails.bodyType}
						</p>
					</div>
					<div>
						<p className="text-sm text-base-content/70">Color</p>
						<p className="font-medium">{vehicleDetails.color}</p>
					</div>
				</div>
			</div>

			{/* Listing Details Section */}
			<div>
				<h3 className="text-lg font-semibold mb-4">Listing Details</h3>
				<div className="space-y-4">
					<div>
						<p className="text-sm text-base-content/70">Title</p>
						<p className="font-medium">{listingDetails.title}</p>
					</div>
					<div>
						<p className="text-sm text-base-content/70">
							Description
						</p>
						<p className="font-medium">
							{listingDetails.description}
						</p>
					</div>
					<div className="grid grid-cols-2 gap-4">
						<div>
							<p className="text-sm text-base-content/70">
								Price
							</p>
							<p className="font-medium">
								${Number(listingDetails.price).toLocaleString()}
							</p>
						</div>
						<div>
							<p className="text-sm text-base-content/70">
								Listing Type
							</p>
							<p className="font-medium capitalize">
								{listingDetails.listingType}
							</p>
						</div>
						<div>
							<p className="text-sm text-base-content/70">
								Location
							</p>
							<p className="font-medium">
								{listingDetails.location}
							</p>
						</div>
						<div>
							<p className="text-sm text-base-content/70">
								Condition
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
				<h3 className="text-lg font-semibold mb-4">Photos</h3>
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
					Back
				</button>
				<button
					type="button"
					onClick={onSubmit}
					className="btn btn-primary"
				>
					<Check className="w-4 h-4 mr-2" />
					Publish Listing
				</button>
			</div>
		</div>
	);
};

export default ReviewListing;
