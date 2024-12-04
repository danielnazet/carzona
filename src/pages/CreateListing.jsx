import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { uploadImage } from "../lib/supabase-storage";
import MainLayout from "../layouts/MainLayout";
import VehicleDetails from "../components/create-listing/VehicleDetails";
import ListingDetails from "../components/create-listing/ListingDetails";
import MediaUpload from "../components/create-listing/MediaUpload";
import ReviewListing from "../components/create-listing/ReviewListing";
import { Car, AlertCircle } from "lucide-react";

const steps = [
	{ id: "vehicle", title: "Vehicle Details" },
	{ id: "listing", title: "Listing Details" },
	{ id: "media", title: "Photos & Media" },
	{ id: "review", title: "Review & Post" },
];

const CreateListing = () => {
	const navigate = useNavigate();
	const [currentStep, setCurrentStep] = useState(0);
	const [error, setError] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [formData, setFormData] = useState({
		vehicleDetails: {},
		listingDetails: {},
		media: [],
	});

	const handleNext = (data) => {
		setFormData((prev) => ({ ...prev, ...data }));
		setCurrentStep((prev) => prev + 1);
	};

	const handleBack = () => {
		setCurrentStep((prev) => prev - 1);
	};

	const handleSubmit = async () => {
		try {
			setIsSubmitting(true);
			setError("");

			// Get current user
			const {
				data: { user },
			} = await supabase.auth.getUser();
			if (!user) throw new Error("Please sign in to create a listing");

			// Create the listing first
			const { data: listing, error: listingError } = await supabase
				.from("car_listings")
				.insert({
					user_id: user.id,
					title: formData.listingDetails.title,
					description: formData.listingDetails.description,
					price: formData.listingDetails.price,
					listing_type: formData.listingDetails.listingType,
					location: formData.listingDetails.location,
					condition: formData.listingDetails.condition,
					horsepower: parseInt(formData.listingDetails.horsepower),
					make: formData.vehicleDetails.make,
					model: formData.vehicleDetails.model,
					year: parseInt(formData.vehicleDetails.year),
					kilometers: parseInt(formData.vehicleDetails.kilometers),
					transmission: formData.vehicleDetails.transmission,
					fuel_type: formData.vehicleDetails.fuelType,
					body_type: formData.vehicleDetails.bodyType,
					color: formData.vehicleDetails.color,
					vin: formData.vehicleDetails.vin,
				})
				.select()
				.single();

			if (listingError) throw listingError;

			// Upload images and create image records
			const imagePromises = formData.media.map(async (image, index) => {
				const url = await uploadImage(
					image.file,
					`${user.id}/${listing.id}`
				);
				return {
					listing_id: listing.id,
					image_url: url,
					position: index,
				};
			});

			const imageUrls = await Promise.all(imagePromises);

			// Insert image records
			const { error: imagesError } = await supabase
				.from("car_images")
				.insert(imageUrls);

			if (imagesError) throw imagesError;

			navigate("/listing-success");
		} catch (err) {
			console.error("Error creating listing:", err);
			setError(err.message);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<MainLayout>
			<div className="min-h-screen bg-base-200 py-8 px-4 sm:px-6 lg:px-8">
				<div className="max-w-3xl mx-auto">
					<div className="text-center mb-8">
						<div className="flex justify-center mb-4">
							<Car className="h-12 w-12 text-primary" />
						</div>
						<h1 className="text-3xl font-bold">
							Create Your Listing
						</h1>
						<p className="mt-2 text-base-content/70">
							Fill in the details to list your car for sale
						</p>
					</div>

					{error && (
						<div className="alert alert-error mb-6">
							<AlertCircle className="h-5 w-5" />
							<span>{error}</span>
						</div>
					)}

					<div className="mb-8">
						<ul className="steps steps-horizontal w-full">
							{steps.map((step, index) => (
								<li
									key={step.id}
									className={`step ${
										index <= currentStep
											? "step-primary"
											: ""
									}`}
									data-content={index + 1}
								>
									{step.title}
								</li>
							))}
						</ul>
					</div>

					<div className="card bg-base-100 shadow-xl">
						<div className="card-body">
							{currentStep === 0 && (
								<VehicleDetails
									initialData={formData.vehicleDetails}
									onNext={handleNext}
								/>
							)}
							{currentStep === 1 && (
								<ListingDetails
									initialData={formData.listingDetails}
									onNext={handleNext}
									onBack={handleBack}
								/>
							)}
							{currentStep === 2 && (
								<MediaUpload
									initialData={formData.media}
									onNext={handleNext}
									onBack={handleBack}
								/>
							)}
							{currentStep === 3 && (
								<ReviewListing
									formData={formData}
									onSubmit={handleSubmit}
									onBack={handleBack}
									isSubmitting={isSubmitting}
								/>
							)}
						</div>
					</div>
				</div>
			</div>
		</MainLayout>
	);
};

export default CreateListing;
