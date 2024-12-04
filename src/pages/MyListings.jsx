import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import MainLayout from "../layouts/MainLayout";
import { Car, Plus, Pencil, Trash2, AlertCircle } from "lucide-react";

const MyListings = () => {
	const [listings, setListings] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [deleteLoading, setDeleteLoading] = useState(null);

	useEffect(() => {
		fetchListings();
	}, []);

	const fetchListings = async () => {
		try {
			const {
				data: { user },
			} = await supabase.auth.getUser();
			if (!user) throw new Error("Please sign in to view your listings");

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
				.eq("user_id", user.id)
				.order("created_at", { ascending: false });

			if (error) throw error;
			setListings(data || []);
		} catch (err) {
			console.error("Error fetching listings:", err);
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	const handleDelete = async (listingId) => {
		if (!window.confirm("Are you sure you want to delete this listing?"))
			return;

		try {
			setDeleteLoading(listingId);
			setError("");

			// Delete the listing (this will trigger cascade delete for car_images and storage)
			const { error: deleteError } = await supabase
				.from("car_listings")
				.delete()
				.eq("id", listingId);

			if (deleteError) throw deleteError;

			// Update local state
			setListings((prev) =>
				prev.filter((listing) => listing.id !== listingId)
			);
		} catch (err) {
			console.error("Error deleting listing:", err);
			setError("Failed to delete listing. Please try again.");
		} finally {
			setDeleteLoading(null);
		}
	};

	if (loading) {
		return (
			<MainLayout>
				<div className="min-h-screen bg-base-200 p-4">
					<div className="max-w-6xl mx-auto">
						<div className="flex justify-center items-center min-h-[400px]">
							<span className="loading loading-spinner loading-lg text-primary"></span>
						</div>
					</div>
				</div>
			</MainLayout>
		);
	}

	return (
		<MainLayout>
			<div className="min-h-screen bg-base-200 py-8 px-4 sm:px-6 lg:px-8">
				<div className="max-w-6xl mx-auto">
					<div className="flex justify-between items-center mb-8">
						<div>
							<h1 className="text-3xl font-bold">My Listings</h1>
							<p className="text-base-content/70 mt-1">
								Manage your car listings
							</p>
						</div>
						<Link to="/create-listing" className="btn btn-primary">
							<Plus className="w-4 h-4 mr-2" />
							New Listing
						</Link>
					</div>

					{error && (
						<div className="alert alert-error mb-6">
							<AlertCircle className="h-5 w-5" />
							<span>{error}</span>
						</div>
					)}

					{listings.length === 0 ? (
						<div className="card bg-base-100 shadow-xl">
							<div className="card-body items-center text-center py-12">
								<Car className="w-16 h-16 text-base-content/20 mb-4" />
								<h3 className="text-xl font-semibold mb-2">
									No Listings Yet
								</h3>
								<p className="text-base-content/70 mb-6">
									Create your first car listing to start
									selling
								</p>
								<Link
									to="/create-listing"
									className="btn btn-primary"
								>
									<Plus className="w-4 h-4 mr-2" />
									Create Listing
								</Link>
							</div>
						</div>
					) : (
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{listings.map((listing) => (
								<div
									key={listing.id}
									className="card bg-base-100 shadow-xl"
								>
									<figure className="relative">
										<img
											src={
												listing.car_images?.[0]
													?.image_url ||
												"https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80"
											}
											alt={listing.title}
											className="h-48 w-full object-cover"
										/>
										<div className="absolute top-2 right-2 flex gap-2">
											<Link
												to={`/edit-listing/${listing.id}`}
												className="btn btn-circle btn-sm bg-base-100/80 hover:bg-base-100"
											>
												<Pencil className="w-4 h-4" />
											</Link>
											<button
												onClick={() =>
													handleDelete(listing.id)
												}
												className={`btn btn-circle btn-sm bg-base-100/80 hover:bg-error hover:text-white ${
													deleteLoading === listing.id
														? "loading"
														: ""
												}`}
												disabled={
													deleteLoading === listing.id
												}
											>
												{deleteLoading !==
													listing.id && (
													<Trash2 className="w-4 h-4" />
												)}
											</button>
										</div>
									</figure>
									<div className="card-body">
										<h2 className="card-title">
											{listing.title}
										</h2>
										<p className="text-2xl font-semibold text-primary">
											$
											{Number(
												listing.price
											).toLocaleString()}
										</p>
										<div className="flex flex-wrap gap-2 mt-2">
											<span className="badge badge-outline">
												{listing.year}
											</span>
											<span className="badge badge-outline">
												{listing.make}
											</span>
											<span className="badge badge-outline">
												{listing.model}
											</span>
										</div>
										<div className="card-actions justify-end mt-4">
											<Link
												to={`/listings/${listing.id}`}
												className="btn btn-primary btn-block"
											>
												View Details
											</Link>
										</div>
									</div>
								</div>
							))}
						</div>
					)}
				</div>
			</div>
		</MainLayout>
	);
};

export default MyListings;