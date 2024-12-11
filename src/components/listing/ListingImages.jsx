import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ListingImages = ({ images = [] }) => {
	const [currentImageIndex, setCurrentImageIndex] = useState(0);

	const defaultImage =
		"https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80";

	const handlePrevious = () => {
		setCurrentImageIndex((prev) =>
			prev > 0 ? prev - 1 : images.length - 1
		);
	};

	const handleNext = () => {
		setCurrentImageIndex((prev) =>
			prev < images.length - 1 ? prev + 1 : 0
		);
	};

	return (
		<div className="card bg-base-100 shadow-xl">
			<figure className="relative h-[400px]">
				<img
					src={images[currentImageIndex]?.image_url || defaultImage}
					alt="Vehicle"
					className="w-full h-full object-cover"
				/>

				{images.length > 1 && (
					<>
						<button
							onClick={handlePrevious}
							className="absolute left-2 top-1/2 -translate-y-1/2 btn btn-circle btn-sm bg-base-100/80 hover:bg-base-100"
						>
							<ChevronLeft className="w-4 h-4" />
						</button>
						<button
							onClick={handleNext}
							className="absolute right-2 top-1/2 -translate-y-1/2 btn btn-circle btn-sm bg-base-100/80 hover:bg-base-100"
						>
							<ChevronRight className="w-4 h-4" />
						</button>
						<div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
							{images.map((_, index) => (
								<button
									key={index}
									onClick={() => setCurrentImageIndex(index)}
									className={`w-3 h-3 rounded-full transition-colors ${
										index === currentImageIndex
											? "bg-primary"
											: "bg-base-100"
									}`}
								/>
							))}
						</div>
					</>
				)}
			</figure>

			{images.length > 1 && (
				<div className="p-4 flex gap-4 overflow-x-auto">
					{images.map((image, index) => (
						<button
							key={index}
							onClick={() => setCurrentImageIndex(index)}
							className={`relative flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden ${
								index === currentImageIndex
									? "ring-2 ring-primary"
									: ""
							}`}
						>
							<img
								src={image.image_url}
								alt={`View ${index + 1}`}
								className="w-full h-full object-cover"
							/>
						</button>
					))}
				</div>
			)}
		</div>
	);
};

export default ListingImages;
