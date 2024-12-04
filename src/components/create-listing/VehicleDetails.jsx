import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Car } from "lucide-react";

const vehicleSchema = z.object({
	make: z.string().min(1, "Make is required"),
	model: z.string().min(1, "Model is required"),
	year: z.string().min(1, "Year is required"),
	kilometers: z.string().min(1, "Kilometers is required"),
	transmission: z.string().min(1, "Transmission is required"),
	fuelType: z.string().min(1, "Fuel type is required"),
	bodyType: z.string().min(1, "Body type is required"),
	color: z.string().min(1, "Color is required"),
	vin: z.string().min(17, "VIN must be 17 characters").max(17),
});

const VehicleDetails = ({ initialData = {}, onNext }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(vehicleSchema),
		defaultValues: initialData,
	});

	const onSubmit = (data) => {
		onNext({ vehicleDetails: data });
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div className="form-control">
					<label className="label">
						<span className="label-text">Make</span>
					</label>
					<input
						type="text"
						{...register("make")}
						className="input input-bordered"
						placeholder="e.g., Toyota"
					/>
					{errors.make && (
						<label className="label">
							<span className="label-text-alt text-error">
								{errors.make.message}
							</span>
						</label>
					)}
				</div>

				<div className="form-control">
					<label className="label">
						<span className="label-text">Model</span>
					</label>
					<input
						type="text"
						{...register("model")}
						className="input input-bordered"
						placeholder="e.g., Camry"
					/>
					{errors.model && (
						<label className="label">
							<span className="label-text-alt text-error">
								{errors.model.message}
							</span>
						</label>
					)}
				</div>

				<div className="form-control">
					<label className="label">
						<span className="label-text">Year</span>
					</label>
					<select
						{...register("year")}
						className="select select-bordered"
					>
						<option value="">Select Year</option>
						{Array.from({ length: 30 }, (_, i) => 2024 - i).map(
							(year) => (
								<option key={year} value={year}>
									{year}
								</option>
							)
						)}
					</select>
					{errors.year && (
						<label className="label">
							<span className="label-text-alt text-error">
								{errors.year.message}
							</span>
						</label>
					)}
				</div>

				<div className="form-control">
					<label className="label">
						<span className="label-text">Kilometers</span>
					</label>
					<input
						type="number"
						{...register("kilometers")}
						className="input input-bordered"
						placeholder="e.g., 50000"
					/>
					{errors.kilometers && (
						<label className="label">
							<span className="label-text-alt text-error">
								{errors.kilometers.message}
							</span>
						</label>
					)}
				</div>

				<div className="form-control">
					<label className="label">
						<span className="label-text">Transmission</span>
					</label>
					<select
						{...register("transmission")}
						className="select select-bordered"
					>
						<option value="">Select Transmission</option>
						<option value="automatic">Automatic</option>
						<option value="manual">Manual</option>
						<option value="cvt">CVT</option>
					</select>
					{errors.transmission && (
						<label className="label">
							<span className="label-text-alt text-error">
								{errors.transmission.message}
							</span>
						</label>
					)}
				</div>

				<div className="form-control">
					<label className="label">
						<span className="label-text">Fuel Type</span>
					</label>
					<select
						{...register("fuelType")}
						className="select select-bordered"
					>
						<option value="">Select Fuel Type</option>
						<option value="gasoline">Gasoline</option>
						<option value="diesel">Diesel</option>
						<option value="electric">Electric</option>
						<option value="hybrid">Hybrid</option>
						<option value="lpg">LPG</option>
					</select>
					{errors.fuelType && (
						<label className="label">
							<span className="label-text-alt text-error">
								{errors.fuelType.message}
							</span>
						</label>
					)}
				</div>

				<div className="form-control">
					<label className="label">
						<span className="label-text">Body Type</span>
					</label>
					<select
						{...register("bodyType")}
						className="select select-bordered"
					>
						<option value="">Select Body Type</option>
						<option value="sedan">Sedan</option>
						<option value="suv">SUV</option>
						<option value="coupe">Coupe</option>
						<option value="truck">Truck</option>
						<option value="van">Van</option>
						<option value="hatchback">Hatchback</option>
						<option value="wagon">Combi</option>
					</select>
					{errors.bodyType && (
						<label className="label">
							<span className="label-text-alt text-error">
								{errors.bodyType.message}
							</span>
						</label>
					)}
				</div>

				<div className="form-control">
					<label className="label">
						<span className="label-text">Color</span>
					</label>
					<input
						type="text"
						{...register("color")}
						className="input input-bordered"
						placeholder="e.g., Silver"
					/>
					{errors.color && (
						<label className="label">
							<span className="label-text-alt text-error">
								{errors.color.message}
							</span>
						</label>
					)}
				</div>
			</div>

			<div className="form-control">
				<label className="label">
					<span className="label-text">
						VIN (Vehicle Identification Number)
					</span>
				</label>
				<input
					type="text"
					{...register("vin")}
					className="input input-bordered"
					placeholder="17-character VIN"
					maxLength={17}
				/>
				{errors.vin && (
					<label className="label">
						<span className="label-text-alt text-error">
							{errors.vin.message}
						</span>
					</label>
				)}
			</div>

			<div className="flex justify-end">
				<button type="submit" className="btn btn-primary">
					Next Step
				</button>
			</div>
		</form>
	);
};

export default VehicleDetails;
