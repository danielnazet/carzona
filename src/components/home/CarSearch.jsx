import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchFilters from "./search/SearchFilters";
import { Search } from "lucide-react";

const CarSearch = () => {
	const navigate = useNavigate();
	const [showFilters, setShowFilters] = useState(false);
	const [filters, setFilters] = useState({
		search: "",
		make: "",
		model: "",
		priceRange: "",
		yearFrom: "",
		yearTo: "",
		bodyType: "",
	});

	const handleSearch = (e) => {
		e.preventDefault();

		// Build query params
		const params = new URLSearchParams();
		Object.entries(filters).forEach(([key, value]) => {
			if (value) params.set(key, value);
		});

		// Navigate to browse page with filters
		navigate(`/browse?${params.toString()}`);
	};

	const handleFilterChange = (field, value) => {
		setFilters((prev) => ({
			...prev,
			[field]: value,
		}));
	};

	return (
		<section className="py-16 px-4 sm:px-8">
			<div className="max-w-7xl mx-auto">
				<div className="text-center mb-10">
					<h2 className="leading-normal text-4xl font-bold mb-3 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
						Odkryj idealne auto dla siebie
					</h2>
					<p className="text-base-content/70 text-lg">
						Przeszukaj tysiące samochodów za pomocą naszych
						zaawansowanych filtrów
					</p>
				</div>

				<div className="card bg-base-200 shadow-xl">
					<div className="card-body p-6 md:p-8">
						<form onSubmit={handleSearch}>
							<div className="flex flex-col lg:flex-row gap-4 items-stretch">
								<div className="flex-1">
									<div className="join w-full">
										<input
											type="text"
											value={filters.search}
											onChange={(e) =>
												handleFilterChange(
													"search",
													e.target.value
												)
											}
											placeholder="Szukaj..."
											className="input input-bordered w-full h-14 text-lg focus:outline-primary join-item"
										/>
										<button
											type="submit"
											className="btn btn-primary join-item px-8 h-14"
										>
											<Search className="h-5 w-5 mr-2" />
											Szukaj
										</button>
									</div>
								</div>

								<button
									type="button"
									className={`btn ${
										showFilters ? "btn-error" : "btn-ghost"
									} h-14 min-w-[140px]`}
									onClick={() => setShowFilters(!showFilters)}
								>
									{showFilters
										? "Ukryj Filtry"
										: "Pokaż Filtry"}
								</button>
							</div>

							{showFilters && (
								<SearchFilters
									filters={filters}
									onFilterChange={handleFilterChange}
								/>
							)}
						</form>
					</div>
				</div>
			</div>
		</section>
	);
};

export default CarSearch;
