import { Car } from "lucide-react";

export const steps = [
	{ id: "vehicle", title: "Vehicle Details" },
	{ id: "listing", title: "Listing Details" },
	{ id: "media", title: "Photos & Media" },
	{ id: "review", title: "Review & Update" },
];

const EditSteps = ({ currentStep }) => {
	return (
		<>
			<div className="text-center mb-8">
				<div className="flex justify-center mb-4">
					<Car className="h-12 w-12 text-primary" />
				</div>
				<h1 className="text-3xl font-bold">Edit Your Listing</h1>
				<p className="mt-2 text-base-content/70">
					Update the details of your car listing
				</p>
			</div>

			<div className="mb-8">
				<ul className="steps steps-horizontal w-full">
					{steps.map((step, index) => (
						<li
							key={step.id}
							className={`step ${
								index <= currentStep ? "step-primary" : ""
							}`}
							data-content={index + 1}
						>
							{step.title}
						</li>
					))}
				</ul>
			</div>
		</>
	);
};

export default EditSteps;
