import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import VehicleDetails from "../components/create-listing/VehicleDetails";
import ListingDetails from "../components/create-listing/ListingDetails";
import MediaUpload from "../components/create-listing/MediaUpload";
import ReviewListing from "../components/create-listing/ReviewListing";
import EditSteps from "../components/edit-listing/EditSteps";
import { AlertCircle } from "lucide-react";
import {
	fetchListingDetails,
	transformListingData,
	updateListing,
} from "../lib/listing-utils";

const EditListing = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [currentStep, setCurrentStep] = useState(0);
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(true);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [formData, setFormData] = useState({
		vehicleDetails: {},
		listingDetails: {},
		media: [],
	});

	useEffect(() => {
		const loadListing = async () => {
			try {
				const listing = await fetchListingDetails(id);
				setFormData(transformListingData(listing));
			} catch (err) {
				console.error("Error fetching listing:", err);
				setError(err.message);
			} finally {
				setIsLoading(false);
			}
		};

		loadListing();
	}, [id]);

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

			await updateListing(id, formData);
			navigate(`/listings/${id}`);
		} catch (err) {
			console.error("Error updating listing:", err);
			setError(err.message);
		} finally {
			setIsSubmitting(false);
		}
	};

	if (isLoading) {
		return (
			<MainLayout>
				<div className="min-h-screen bg-base-200 flex items-center justify-center">
					<span className="loading loading-spinner loading-lg text-primary"></span>
				</div>
			</MainLayout>
		);
	}

	if (error) {
		return (
			<MainLayout>
				<div className="min-h-screen bg-base-200 p-8">
					<div className="max-w-3xl mx-auto text-center">
						<AlertCircle className="w-16 h-16 text-error mx-auto mb-4" />
						<h2 className="text-2xl font-bold mb-4">Error</h2>
						<p className="text-base-content/70 mb-6">{error}</p>
						<button
							onClick={() => navigate(-1)}
							className="btn btn-primary"
						>
							Go Back
						</button>
					</div>
				</div>
			</MainLayout>
		);
	}

	return (
		<MainLayout>
			<div className="min-h-screen bg-base-200 py-8 px-4 sm:px-6 lg:px-8">
				<div className="max-w-3xl mx-auto">
					<EditSteps currentStep={currentStep} />

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

export default EditListing;
