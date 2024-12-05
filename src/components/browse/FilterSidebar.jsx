import { Car, Calendar, DollarSign, Fuel, Gauge } from "lucide-react";
import { CONDITIONS } from "../../lib/constants";

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

const FilterSidebar = ({ filters, onFilterChange }) => {
	const handleChange = (field, value) => {
		onFilterChange({
			...filters,
			[field]: value,
		});
	};

	return (
		<div className="w-full lg:w-72 space-y-6">
			<div className="card bg-base-100 shadow-xl">
				<div className="card-body">
					<h2 className="card-title mb-4">Filters</h2>

					{/* Make */}
					<div className="form-control">
						<label className="label">
							<span className="label-text flex items-center gap-2">
								<Car className="w-4 h-4" />
								Make
							</span>
						</label>
						<select
							value={filters.make}
							onChange={(e) =>
								handleChange("make", e.target.value)
							}
							className="select select-bordered w-full"
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
								handleChange("model", e.target.value)
							}
							placeholder="Enter model..."
							className="input input-bordered w-full"
						/>
					</div>

					{/* Price Range */}
					<div className="form-control">
						<label className="label">
							<span className="label-text flex items-center gap-2">
								<DollarSign className="w-4 h-4" />
								Price Range (PLN)
							</span>
						</label>
						<div className="flex gap-2">
							<input
								type="number"
								placeholder="Min"
								value={filters.priceMin}
								onChange={(e) =>
									handleChange("priceMin", e.target.value)
								}
								className="input input-bordered w-full"
							/>
							<input
								type="number"
								placeholder="Max"
								value={filters.priceMax}
								onChange={(e) =>
									handleChange("priceMax", e.target.value)
								}
								className="input input-bordered w-full"
							/>
						</div>
					</div>

					{/* Year Range */}
					<div className="form-control">
						<label className="label">
							<span className="label-text flex items-center gap-2">
								<Calendar className="w-4 h-4" />
								Year Range
							</span>
						</label>
						<div className="flex gap-2">
							<input
								type="number"
								placeholder="From"
								value={filters.yearMin}
								onChange={(e) =>
									handleChange("yearMin", e.target.value)
								}
								className="input input-bordered w-full"
							/>
							<input
								type="number"
								placeholder="To"
								value={filters.yearMax}
								onChange={(e) =>
									handleChange("yearMax", e.target.value)
								}
								className="input input-bordered w-full"
							/>
						</div>
					</div>

					{/* Body Type */}
					<div className="form-control">
						<label className="label">
							<span className="label-text flex items-center gap-2">
								<Car className="w-4 h-4" />
								Body Type
							</span>
						</label>
						<select
							value={filters.bodyType}
							onChange={(e) =>
								handleChange("bodyType", e.target.value)
							}
							className="select select-bordered w-full"
						>
							<option value="">All Types</option>
							<option value="sedan">Sedan</option>
							<option value="suv">SUV</option>
							<option value="coupe">Coupe</option>
							<option value="truck">Truck</option>
							<option value="van">Van</option>
							<option value="hatchback">Hatchback</option>
							<option value="wagon">Wagon</option>
						</select>
					</div>

					{/* Fuel Type */}
					<div className="form-control">
						<label className="label">
							<span className="label-text flex items-center gap-2">
								<Fuel className="w-4 h-4" />
								Fuel Type
							</span>
						</label>
						<select
							value={filters.fuelType}
							onChange={(e) =>
								handleChange("fuelType", e.target.value)
							}
							className="select select-bordered w-full"
						>
							<option value="">All Fuel Types</option>
							<option value="gasoline">Gasoline</option>
							<option value="diesel">Diesel</option>
							<option value="electric">Electric</option>
							<option value="hybrid">Hybrid</option>
							<option value="lpg">LPG</option>
						</select>
					</div>

					{/* Transmission */}
					<div className="form-control">
						<label className="label">
							<span className="label-text flex items-center gap-2">
								<Gauge className="w-4 h-4" />
								Transmission
							</span>
						</label>
						<select
							value={filters.transmission}
							onChange={(e) =>
								handleChange("transmission", e.target.value)
							}
							className="select select-bordered w-full"
						>
							<option value="">All Transmissions</option>
							<option value="automatic">Automatic</option>
							<option value="manual">Manual</option>
							<option value="cvt">CVT</option>
						</select>
					</div>

					{/* Condition */}
					<div className="form-control">
						<label className="label">
							<span className="label-text">Condition</span>
						</label>
						<select
							value={filters.condition}
							onChange={(e) =>
								handleChange("condition", e.target.value)
							}
							className="select select-bordered w-full"
						>
							<option value="">All Conditions</option>
							{CONDITIONS.map(({ value, label }) => (
								<option key={value} value={value}>
									{label}
								</option>
							))}
						</select>
					</div>

					<button
						onClick={() => onFilterChange({})}
						className="btn btn-ghost btn-sm mt-4"
					>
						Reset Filters
					</button>
				</div>
			</div>
		</div>
	);
};

export default FilterSidebar;
