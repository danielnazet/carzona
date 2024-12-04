import { supabase } from "./supabase";

export const uploadImage = async (file, path) => {
	try {
		const fileExt = file.name.split(".").pop();
		const fileName = `${Math.random()
			.toString(36)
			.substring(2)}.${fileExt}`;
		const filePath = `${path}/${fileName}`;

		// Check file size (max 5MB)
		if (file.size > 5 * 1024 * 1024) {
			throw new Error("File size must be less than 5MB");
		}

		// Check file type
		if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
			throw new Error("Only JPEG, PNG, and WebP images are allowed");
		}

		const { error: uploadError, data } = await supabase.storage
			.from("car-images")
			.upload(filePath, file, {
				cacheControl: "3600",
				upsert: false,
			});

		if (uploadError) throw uploadError;

		const {
			data: { publicUrl },
		} = supabase.storage.from("car-images").getPublicUrl(filePath);

		return publicUrl;
	} catch (error) {
		console.error("Error uploading image:", error);
		throw error;
	}
};

export const deleteImage = async (path) => {
	try {
		// Extract the path after car-images/
		const storagePath = path.split("car-images/")[1];

		const { error } = await supabase.storage
			.from("car-images")
			.remove([storagePath]);

		if (error) throw error;
	} catch (error) {
		console.error("Error deleting image:", error);
		throw error;
	}
};
