import { Link } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { Car, Search, Plus, Heart } from "lucide-react";

const Welcome = () => {
	return (
		<MainLayout>
			<div className="min-h-screen bg-base-200 py-16 px-4">
				<div className="max-w-4xl mx-auto text-center">
					<div className="flex justify-center mb-8">
						<Car className="w-20 h-20 text-primary" />
					</div>

					<h1 className="text-5xl font-bold mb-6">
						Welcome to Carzona!
					</h1>

					<p className="text-xl text-base-content/70 mb-12">
						Your journey in the world of cars begins here. Explore
						our features and start your automotive adventure.
					</p>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
						<div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
							<div className="card-body items-center text-center">
								<Search className="w-12 h-12 text-primary mb-4" />
								<h2 className="card-title mb-2">Browse Cars</h2>
								<p className="text-base-content/70 mb-4">
									Explore our extensive collection of vehicles
								</p>
								<Link
									to="/browse"
									className="btn btn-primary btn-block"
								>
									Start Browsing
								</Link>
							</div>
						</div>

						<div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
							<div className="card-body items-center text-center">
								<Plus className="w-12 h-12 text-primary mb-4" />
								<h2 className="card-title mb-2">
									Sell Your Car
								</h2>
								<p className="text-base-content/70 mb-4">
									List your vehicle and reach potential buyers
								</p>
								<Link
									to="/create-listing"
									className="btn btn-primary btn-block"
								>
									Create Listing
								</Link>
							</div>
						</div>

						<div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
							<div className="card-body items-center text-center">
								<Heart className="w-12 h-12 text-primary mb-4" />
								<h2 className="card-title mb-2">
									Save Favorites
								</h2>
								<p className="text-base-content/70 mb-4">
									Keep track of cars you're interested in
								</p>
								<Link
									to="/favorites"
									className="btn btn-primary btn-block"
								>
									View Favorites
								</Link>
							</div>
						</div>
					</div>

					<div className="card bg-base-100 shadow-xl">
						<div className="card-body">
							<h2 className="text-2xl font-bold mb-4">
								Getting Started
							</h2>
							<ul className="text-left space-y-4 mb-6">
								<li className="flex items-start gap-3">
									<span className="badge badge-primary mt-1">
										1
									</span>
									<span>
										Browse through our extensive collection
										of vehicles or create your own listing
									</span>
								</li>
								<li className="flex items-start gap-3">
									<span className="badge badge-primary mt-1">
										2
									</span>
									<span>
										Use filters to find exactly what you're
										looking for
									</span>
								</li>
								<li className="flex items-start gap-3">
									<span className="badge badge-primary mt-1">
										3
									</span>
									<span>
										Save your favorite listings to compare
										later
									</span>
								</li>
								<li className="flex items-start gap-3">
									<span className="badge badge-primary mt-1">
										4
									</span>
									<span>
										Contact sellers directly through our
										platform
									</span>
								</li>
							</ul>
							<div className="flex justify-center">
								<Link
									to="/browse"
									className="btn btn-primary btn-wide"
								>
									Start Exploring
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</MainLayout>
	);
};

export default Welcome;
