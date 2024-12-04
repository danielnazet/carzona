import { useState } from "react";
import {
	Search,
	SlidersHorizontal,
	X,
	Car,
	DollarSign,
	Calendar,
	Tag,
} from "lucide-react";

const CarSearch = () => {
	const [showFilters, setShowFilters] = useState(false);

	const brands = [
		"All Brands",
		"Audi",
		"BMW",
		"Mercedes",
		"Porsche",
		"Tesla",
		"Toyota",
		"Volkswagen",
	];
	const types = [
		"All Types",
		"SUV",
		"Sedan",
		"Sports Car",
		"Electric",
		"Hybrid",
		"Luxury",
	];
	const priceRanges = [
		"Any Price",
		"Under $10,000",
		"$10,000 - $30,000",
		"$30,000 - $50,000",
		"$50,000 - $100,000",
		"$100,000+",
	];

	return (
		<section className="py-16 px-4 sm:px-8">
			<div className="max-w-7xl mx-auto">
				<div className="text-center mb-10">
					<h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
						Odkryj idealne auto dla siebie
					</h2>
					<p className="text-base-content/70 text-lg">
						Przeszukaj tysiące samochodów za pomocą naszych
						zaawansowanych filtrów
					</p>
				</div>

				<div className="card bg-base-200 shadow-xl">
					<div className="card-body p-6 md:p-8">
						{/* Main Search Bar */}
						<div className="flex flex-col lg:flex-row gap-4 items-stretch">
							<div className="flex-1">
								<div className="join w-full">
									<div className="join-item flex-1">
										<input
											type="text"
											placeholder="Szukaj po marce, modelu lub słowie kluczowym..."
											className="input input-bordered w-full h-14 text-lg focus:outline-primary"
										/>
									</div>
									<button className="btn btn-primary join-item px-8 h-14">
										<Search className="h-5 w-5 mr-2" />
										Szukaj
									</button>
								</div>
							</div>

							<button
								className={`btn ${
									showFilters ? "btn-error" : "btn-secondary"
								} h-14 min-w-[140px]`}
								onClick={() => setShowFilters(!showFilters)}
							>
								{showFilters ? (
									<>
										<X className="h-5 w-5" />
										<span>Hide</span>
									</>
								) : (
									<>
										<SlidersHorizontal className="h-5 w-5" />
										<span>Filtry</span>
									</>
								)}
							</button>
						</div>

						{/* Advanced Filters */}
						{showFilters && (
							<div className="mt-6 animate-fadeIn">
								<div className="divider">Advanced Filters</div>

								<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
									<div className="form-control">
										<label className="label">
											<span className="label-text flex items-center gap-2">
												<Car className="h-4 w-4" />
												Brand
											</span>
										</label>
										<select className="select select-bordered h-12">
											{brands.map((brand) => (
												<option key={brand}>
													{brand}
												</option>
											))}
										</select>
									</div>

									<div className="form-control">
										<label className="label">
											<span className="label-text flex items-center gap-2">
												<Tag className="h-4 w-4" />
												Vehicle Type
											</span>
										</label>
										<select className="select select-bordered h-12">
											{types.map((type) => (
												<option key={type}>
													{type}
												</option>
											))}
										</select>
									</div>

									<div className="form-control">
										<label className="label">
											<span className="label-text flex items-center gap-2">
												<DollarSign className="h-4 w-4" />
												Price Range
											</span>
										</label>
										<select className="select select-bordered h-12">
											{priceRanges.map((range) => (
												<option key={range}>
													{range}
												</option>
											))}
										</select>
									</div>

									<div className="form-control">
										<label className="label">
											<span className="label-text flex items-center gap-2">
												<Calendar className="h-4 w-4" />
												Year
											</span>
										</label>
										<div className="join w-full">
											<select className="select select-bordered join-item w-1/2 h-12">
												<option value="">From</option>
												{Array.from(
													{ length: 30 },
													(_, i) => 2024 - i
												).map((year) => (
													<option key={year}>
														{year}
													</option>
												))}
											</select>
											<select className="select select-bordered join-item w-1/2 h-12">
												<option value="">To</option>
												{Array.from(
													{ length: 30 },
													(_, i) => 2024 - i
												).map((year) => (
													<option key={year}>
														{year}
													</option>
												))}
											</select>
										</div>
									</div>
								</div>

								<div className="flex justify-end mt-6 gap-3">
									<button className="btn btn-ghost btn-md">
										Reset
									</button>
									<button className="btn btn-primary btn-md px-8">
										Apply Filters
									</button>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</section>
	);
};

export default CarSearch;
