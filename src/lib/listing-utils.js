import { supabase } from "./supabase";
import { uploadImage } from "./supabase-storage";

export const fetchListingDetails = async (id) => {
	const {
		data: { user },
	} = await supabase.auth.getUser();
	if (!user) throw new Error("Please sign in to edit your listing");

	const { data: listing, error: listingError } = await supabase
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
	if (!listing) throw new Error("Listing not found");
	if (listing.user_id !== user.id)
		throw new Error("You can only edit your own listings");

	return listing;
};

export const transformListingData = (listing) => ({
	vehicleDetails: {
		make: listing.make,
		model: listing.model,
		year: listing.year.toString(),
		kilometers: listing.kilometers.toString(),
		transmission: listing.transmission,
		fuelType: listing.fuel_type,
		bodyType: listing.body_type,
		color: listing.color,
		vin: listing.vin,
	},
	listingDetails: {
		title: listing.title,
		description: listing.description,
		price: listing.price.toString(),
		listingType: listing.listing_type,
		location: listing.location,
		condition: listing.condition,
		horsepower: listing.horsepower.toString(),
	},
	media: listing.car_images.map((image) => ({
		preview: image.image_url,
		existingUrl: image.image_url,
	})),
});

export const updateListing = async (id, formData) => {
	const {
		data: { user },
	} = await supabase.auth.getUser();
	if (!user) throw new Error("Please sign in to update your listing");

	// Update the listing
	const { error: updateError } = await supabase
		.from("car_listings")
		.update({
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
			updated_at: new Date().toISOString(),
		})
		.eq("id", id);

	if (updateError) throw updateError;

	// Handle new images
	const newImages = formData.media.filter((image) => !image.existingUrl);

	if (newImages.length > 0) {
		const imagePromises = newImages.map(async (image, index) => {
			const url = await uploadImage(image.file, `${user.id}/${id}`);
			return {
				listing_id: id,
				image_url: url,
				position: index,
			};
		});

		const imageUrls = await Promise.all(imagePromises);

		// Insert new images
		const { error: imagesError } = await supabase
			.from("car_images")
			.insert(imageUrls);

		if (imagesError) throw imagesError;
	}
};
