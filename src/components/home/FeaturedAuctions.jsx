import { Timer, Users, Gauge } from "lucide-react";

const auctions = [
	{
		id: 1,
		title: "2023 BMW M4 Competition",
		image: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80",
		currentBid: 75000,
		timeLeft: "2d 5h",
		bids: 23,
		mileage: "1,200 mi",
	},
	{
		id: 2,
		title: "2022 Porsche 911 GT3",
		image: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80",
		currentBid: 165000,
		timeLeft: "1d 12h",
		bids: 45,
		mileage: "3,500 mi",
	},
	{
		id: 3,
		title: "2024 Audi RS e-tron GT",
		image: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80",
		currentBid: 120000,
		timeLeft: "3d 8h",
		bids: 18,
		mileage: "500 mi",
	},
];

const FeaturedAuctions = () => {
	return (
		<section className="py-16 px-4 sm:px-8 bg-base-200">
			<div className="max-w-7xl mx-auto">
				<div className="text-center mb-12">
					<h2 className="text-4xl font-bold mb-4">
						Featured Auctions
					</h2>
					<p className="text-lg text-base-content/70">
						Bid on exclusive cars from verified sellers
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{auctions.map((auction) => (
						<div
							key={auction.id}
							className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow"
						>
							<figure className="px-4 pt-4">
								<img
									src={auction.image}
									alt={auction.title}
									className="rounded-xl h-48 w-full object-cover"
								/>
							</figure>
							<div className="card-body">
								<h3 className="card-title">{auction.title}</h3>
								<div className="flex justify-between items-center mt-2">
									<div className="text-primary font-semibold">
										Current Bid:
										<span className="text-lg ml-1">
											$
											{auction.currentBid.toLocaleString()}
										</span>
									</div>
									<div className="flex items-center gap-1 text-warning">
										<Timer className="w-4 h-4" />
										<span>{auction.timeLeft}</span>
									</div>
								</div>
								<div className="flex justify-between text-sm text-base-content/70 mt-4">
									<div className="flex items-center gap-1">
										<Users className="w-4 h-4" />
										<span>{auction.bids} bids</span>
									</div>
									<div className="flex items-center gap-1">
										<Gauge className="w-4 h-4" />
										<span>{auction.mileage}</span>
									</div>
								</div>
								<div className="card-actions mt-4">
									<button className="btn btn-primary btn-block">
										Place Bid
									</button>
								</div>
							</div>
						</div>
					))}
				</div>

				<div className="text-center mt-12">
					<button className="btn btn-outline btn-wide">
						View All Auctions
					</button>
				</div>
			</div>
		</section>
	);
};

export default FeaturedAuctions;
