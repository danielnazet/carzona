const Hero = () => {
	return (
		<div
			className="hero min-h-[600px]"
			style={{
				backgroundImage:
					'url("https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80")',
				backgroundSize: "cover",
				backgroundPosition: "center",
			}}
		>
			<div className="hero-overlay bg-opacity-60"></div>
			<div className="hero-content text-center text-neutral-content">
				<div className="max-w-md">
					<h1 className="mb-5 text-5xl font-bold">
						Find Your Dream Car
					</h1>
					<p className="mb-5">
						Browse through thousands of cars from trusted dealers
						and private sellers. Your perfect ride is just a click
						away.
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<button className="btn btn-primary">Browse Cars</button>
						<button className="btn btn-outline btn-secondary">
							Sell Your Car
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Hero;
