import { Car, Calendar, DollarSign } from "lucide-react";

const POPULAR_MAKES = [
	"Audi",
	"BMW",
	"Ford",
	"Honda",
	"Hyundai",
	"Kia",
	"Mazda",
	"Mercedes-Benz",
	"Nissan",
	"Opel",
	"Peugeot",
	"Renault",
	"Skoda",
	"Toyota",
	"Volkswagen",
	"Volvo",
];

const PRICE_RANGES = [
	{ label: "Any Price", value: "" },
	{ label: "Under 10,000 PLN", value: "0-10000" },
	{ label: "10,000 - 30,000 PLN", value: "10000-30000" },
	{ label: "30,000 - 50,000 PLN", value: "30000-50000" },
	{ label: "50,000 - 100,000 PLN", value: "50000-100000" },
	{ label: "Over 100,000 PLN", value: "100000-" },
];

const BODY_TYPES = [
	{ label: "All Types", value: "" },
	{ label: "Sedan", value: "sedan" },
	{ label: "SUV", value: "suv" },
	{ label: "Coupe", value: "coupe" },
	{ label: "Hatchback", value: "hatchback" },
	{ label: "Wagon", value: "wagon" },
	{ label: "Van", value: "van" },
	{ label: "Truck", value: "truck" },
];

const SearchFilters = ({ filters, onFilterChange }) => {
	return (
		<div className="mt-6 animate-fadeIn">
			<div className="divider">Zaawansowane</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				{/* Make */}
				<div className="form-control">
					<label className="label">
						<span className="label-text flex items-center gap-2">
							<Car className="h-4 w-4" />
							Make
						</span>
					</label>
					<select
						value={filters.make}
						onChange={(e) => onFilterChange("make", e.target.value)}
						className="select select-bordered h-12"
					>
						<option value="">All Makes</option>
						{POPULAR_MAKES.map((make) => (
							<option key={make} value={make}>
								{make}
							</option>
						))}
					</select>
				</div>

				{/* Model */}
				<div className="form-control">
					<label className="label">
						<span className="label-text">Model</span>
					</label>
					<input
						type="text"
						value={filters.model}
						onChange={(e) =>
							onFilterChange("model", e.target.value)
						}
						placeholder="Enter model..."
						className="input input-bordered h-12"
					/>
				</div>

				{/* Price Range */}
				<div className="form-control">
					<label className="label">
						<span className="label-text flex items-center gap-2">
							<DollarSign className="h-4 w-4" />
							Price Range
						</span>
					</label>
					<select
						value={filters.priceRange}
						onChange={(e) =>
							onFilterChange("priceRange", e.target.value)
						}
						className="select select-bordered h-12"
					>
						{PRICE_RANGES.map(({ label, value }) => (
							<option key={value} value={value}>
								{label}
							</option>
						))}
					</select>
				</div>

				{/* Year Range */}
				<div className="form-control">
					<label className="label">
						<span className="label-text flex items-center gap-2">
							<Calendar className="h-4 w-4" />
							Year
						</span>
					</label>
					<div className="join w-full">
						<select
							value={filters.yearFrom}
							onChange={(e) =>
								onFilterChange("yearFrom", e.target.value)
							}
							className="select select-bordered join-item w-1/2 h-12"
						>
							<option value="">From</option>
							{Array.from({ length: 30 }, (_, i) => 2024 - i).map(
								(year) => (
									<option key={year} value={year}>
										{year}
									</option>
								)
							)}
						</select>
						<select
							value={filters.yearTo}
							onChange={(e) =>
								onFilterChange("yearTo", e.target.value)
							}
							className="select select-bordered join-item w-1/2 h-12"
						>
							<option value="">To</option>
							{Array.from({ length: 30 }, (_, i) => 2024 - i).map(
								(year) => (
									<option key={year} value={year}>
										{year}
									</option>
								)
							)}
						</select>
					</div>
				</div>

				{/* Body Type */}
				<div className="form-control">
					<label className="label">
						<span className="label-text flex items-center gap-2">
							<Car className="h-4 w-4" />
							Body Type
						</span>
					</label>
					<select
						value={filters.bodyType}
						onChange={(e) =>
							onFilterChange("bodyType", e.target.value)
						}
						className="select select-bordered h-12"
					>
						{BODY_TYPES.map(({ label, value }) => (
							<option key={value} value={value}>
								{label}
							</option>
						))}
					</select>
				</div>
			</div>

			<div className="flex justify-end mt-6">
				<button
					type="button"
					onClick={() => {
						Object.keys(filters).forEach((key) => {
							onFilterChange(key, "");
						});
					}}
					className="btn btn-ghost"
				>
					Reset Filters
				</button>
			</div>
		</div>
	);
};

export default SearchFilters;
