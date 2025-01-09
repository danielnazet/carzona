import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import MainLayout from "../layouts/MainLayout";
import { ArrowLeft } from "lucide-react";
import ListingImages from "../components/listing/ListingImages";
import ListingSpecs from "../components/listing/ListingSpecs";
import ContactInfo from "../components/listing/ContactInfo";
import SafetyTips from "../components/listing/SafetyTips";

const ListingDetails = () => {
	const { id } = useParams();
	const [listing, setListing] = useState(null);
	const [seller, setSeller] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		fetchListingDetails();
	}, [id]);

	const fetchListingDetails = async () => {
		try {
			setLoading(true);
			setError("");

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
					.select("id, first_name, last_name, phone, email")
					.eq("id", listingData.user_id)
					.single();

				if (sellerError) throw sellerError;
				setSeller(sellerData);
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

	return (
		<MainLayout>
			<div className="min-h-screen bg-base-200 py-8 px-4 sm:px-6 lg:px-8">
				<div className="max-w-7xl mx-auto">
					<Link to="/" className="btn btn-ghost mb-6">
						<ArrowLeft className="w-4 h-4 mr-2" />
						Back to Listings
					</Link>

					<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
						<div className="lg:col-span-2 space-y-6">
							<ListingImages images={listing.car_images} />
							<ListingSpecs listing={listing} />
						</div>

						<div className="space-y-6">
							<ContactInfo listing={listing} seller={seller} />
							<SafetyTips />
						</div>
					</div>
				</div>
			</div>
		</MainLayout>
	);
};

export default ListingDetails;
