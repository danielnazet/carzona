import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import FilterSidebar from "../components/browse/FilterSidebar";
import ListingGrid from "../components/browse/ListingGrid";
import SearchBar from "../components/browse/SearchBar";
import { supabase } from "../lib/supabase";

const Browse = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const [listings, setListings] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [filters, setFilters] = useState({
		search: searchParams.get("search") || "",
		make: searchParams.get("make") || "",
		model: searchParams.get("model") || "",
		priceMin: searchParams.get("priceMin") || "",
		priceMax: searchParams.get("priceMax") || "",
		yearMin: searchParams.get("yearMin") || "",
		yearMax: searchParams.get("yearMax") || "",
		bodyType: searchParams.get("bodyType") || "",
		fuelType: searchParams.get("fuelType") || "",
		transmission: searchParams.get("transmission") || "",
		condition: searchParams.get("condition") || "",
	});

	const fetchListings = async () => {
		try {
			setLoading(true);
			let query = supabase
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
				.eq("status", "active") // Only fetch active listings
				.order("created_at", { ascending: false });

			// Apply filters
			if (filters.search) {
				query = query.or(
					`make.ilike.%${filters.search}%,model.ilike.%${filters.search}%,title.ilike.%${filters.search}%`
				);
			}
			if (filters.make) query = query.ilike("make", `%${filters.make}%`);
			if (filters.model)
				query = query.ilike("model", `%${filters.model}%`);
			if (filters.priceMin) query = query.gte("price", filters.priceMin);
			if (filters.priceMax) query = query.lte("price", filters.priceMax);
			if (filters.yearMin) query = query.gte("year", filters.yearMin);
			if (filters.yearMax) query = query.lte("year", filters.yearMax);
			if (filters.bodyType)
				query = query.eq("body_type", filters.bodyType);
			if (filters.fuelType)
				query = query.eq("fuel_type", filters.fuelType);
			if (filters.transmission)
				query = query.eq("transmission", filters.transmission);
			if (filters.condition)
				query = query.eq("condition", filters.condition);

			const { data, error: fetchError } = await query;

			if (fetchError) throw fetchError;
			setListings(data || []);
		} catch (err) {
			console.error("Error fetching listings:", err);
			setError("Failed to load listings");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchListings();
	}, [filters]);

	const handleFilterChange = (newFilters) => {
		setFilters(newFilters);

		// Update URL params
		const params = new URLSearchParams();
		Object.entries(newFilters).forEach(([key, value]) => {
			if (value) params.set(key, value);
		});
		setSearchParams(params);
	};

	const handleSearch = (searchTerm) => {
		setFilters((prev) => ({
			...prev,
			search: searchTerm,
		}));
	};

	return (
		<MainLayout>
			<div className="min-h-screen bg-base-200">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
					<div className="flex flex-col gap-6">
						<SearchBar
							onSearch={handleSearch}
							initialValue={filters.search}
						/>

						<div className="flex flex-col lg:flex-row gap-8">
							<FilterSidebar
								filters={filters}
								onFilterChange={handleFilterChange}
							/>

							<div className="flex-1">
								<ListingGrid
									listings={listings}
									loading={loading}
									error={error}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</MainLayout>
	);
};

export default Browse;
