import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CONDITIONS } from "../../lib/constants";
import { Eye, EyeOff } from "lucide-react";

const listingSchema = z.object({
	title: z.string().min(10, "Title must be at least 10 characters"),
	description: z
		.string()
		.min(50, "Description must be at least 50 characters"),
	price: z.string().min(1, "Price is required"),
	listingType: z.string().min(1, "Listing type is required"),
	location: z.string().min(1, "Location is required"),
	features: z.array(z.string()).optional(),
	condition: z.string().min(1, "Condition is required"),
	horsepower: z.string().min(1, "Horsepower is required"),
});

const ListingDetails = ({ initialData = {}, onNext, onBack }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(listingSchema),
		defaultValues: initialData,
	});

	const onSubmit = (data) => {
		onNext({ listingDetails: data });
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
			<div className="form-control">
				<label className="label">
					<span className="label-text">Tytul</span>
				</label>
				<input
					type="text"
					{...register("title")}
					className="input input-bordered"
					placeholder="e.g., 2020 Toyota Camry XSE - Excellent Condition"
				/>
				{errors.title && (
					<label className="label">
						<span className="label-text-alt text-error">
							{errors.title.message}
						</span>
					</label>
				)}
			</div>

			<div className="form-control">
				<label className="label">
					<span className="label-text">Opis</span>
				</label>
				<textarea
					{...register("description")}
					className="textarea textarea-bordered h-32"
					placeholder="Describe your vehicle in detail..."
				/>
				{errors.description && (
					<label className="label">
						<span className="label-text-alt text-error">
							{errors.description.message}
						</span>
					</label>
				)}
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div className="form-control">
					<label className="label">
						<span className="label-text">Cena (PLN)</span>
					</label>
					<input
						type="number"
						{...register("price")}
						className="input input-bordered"
						placeholder="Enter price in PLN"
					/>
					{errors.price && (
						<label className="label">
							<span className="label-text-alt text-error">
								{errors.price.message}
							</span>
						</label>
					)}
				</div>

				<div className="form-control">
					<label className="label">
						<span className="label-text">Moc silnika</span>
					</label>
					<input
						type="number"
						{...register("horsepower")}
						className="input input-bordered"
						placeholder="np. 150"
					/>
					{errors.horsepower && (
						<label className="label">
							<span className="label-text-alt text-error">
								{errors.horsepower.message}
							</span>
						</label>
					)}
				</div>

				<div className="form-control">
					<label className="label">
						<span className="label-text">Typ ogloszenia</span>
					</label>
					<select
						{...register("listingType")}
						className="select select-bordered"
					>
						<option value="">Wybierz ogloszenie</option>
						<option value="sale">Sprzedaz</option>
						<option value="auction">Aukcja</option>
					</select>
					{errors.listingType && (
						<label className="label">
							<span className="label-text-alt text-error">
								{errors.listingType.message}
							</span>
						</label>
					)}
				</div>

				<div className="form-control">
					<label className="label">
						<span className="label-text">Lokalizacja</span>
					</label>
					<input
						type="text"
						{...register("location")}
						className="input input-bordered"
						placeholder="City, Poland"
					/>
					{errors.location && (
						<label className="label">
							<span className="label-text-alt text-error">
								{errors.location.message}
							</span>
						</label>
					)}
				</div>

				<div className="form-control">
					<label className="label">
						<span className="label-text">Condition</span>
					</label>
					<select
						{...register("condition")}
						className="select select-bordered"
					>
						<option value="">Select Condition</option>
						{CONDITIONS.map(({ value, label }) => (
							<option key={value} value={value}>
								{label}
							</option>
						))}
					</select>
					{errors.condition && (
						<label className="label">
							<span className="label-text-alt text-error">
								{errors.condition.message}
							</span>
						</label>
					)}
				</div>
			</div>

			<div className="flex justify-between">
				<button
					type="button"
					onClick={onBack}
					className="btn btn-ghost"
				>
					Back
				</button>
				<button type="submit" className="btn btn-primary">
					Next Step
				</button>
			</div>
		</form>
	);
};

export default ListingDetails;
