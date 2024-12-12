import { useCallback, useState } from "react";
import { Image, Upload, X, AlertCircle } from "lucide-react";
import { MAX_PHOTOS } from "../../lib/constants";

const MediaUpload = ({ initialData = [], onNext, onBack }) => {
	const [images, setImages] = useState(initialData);
	const [dragActive, setDragActive] = useState(false);
	const [error, setError] = useState("");

	const handleDrag = useCallback((e) => {
		e.preventDefault();
		e.stopPropagation();
		if (e.type === "dragenter" || e.type === "dragover") {
			setDragActive(true);
		} else if (e.type === "dragleave") {
			setDragActive(false);
		}
	}, []);

	const handleDrop = useCallback((e) => {
		e.preventDefault();
		e.stopPropagation();
		setDragActive(false);

		const files = [...e.dataTransfer.files];
		handleFiles(files);
	}, []);

	const handleFiles = (files) => {
		setError("");
		const validFiles = files.filter((file) =>
			file.type.startsWith("image/")
		);

		if (images.length + validFiles.length > MAX_PHOTOS) {
			setError(`Maximum ${MAX_PHOTOS} photos allowed`);
			return;
		}

		const newImages = validFiles.map((file) => ({
			file,
			preview: URL.createObjectURL(file),
		}));
		setImages((prev) => [...prev, ...newImages]);
	};

	const handleFileInput = (e) => {
		const files = [...e.target.files];
		handleFiles(files);
	};

	const removeImage = (index) => {
		setImages((prev) => prev.filter((_, i) => i !== index));
		setError("");
	};

	const handleSubmit = () => {
		if (images.length === 0) {
			setError("At least one photo is required");
			return;
		}
		onNext({ media: images });
	};

	return (
		<div className="space-y-6">
			{error && (
				<div className="alert alert-error">
					<AlertCircle className="w-4 h-4" />
					<span>{error}</span>
				</div>
			)}

			<div
				className={`border-2 border-dashed rounded-lg p-8 text-center ${
					dragActive
						? "border-primary bg-primary/5"
						: "border-base-300"
				}`}
				onDragEnter={handleDrag}
				onDragLeave={handleDrag}
				onDragOver={handleDrag}
				onDrop={handleDrop}
			>
				<div className="flex flex-col items-center">
					<Upload className="w-12 h-12 text-base-content/50 mb-4" />
					<p className="text-lg font-medium mb-2">
						Drag and drop your images here
					</p>
					<p className="text-base-content/70 mb-4">
						or click to select files (max {MAX_PHOTOS} photos)
					</p>
					<input
						type="file"
						multiple
						accept="image/*"
						onChange={handleFileInput}
						className="hidden"
						id="file-upload"
						disabled={images.length >= MAX_PHOTOS}
					/>
					<label
						htmlFor="file-upload"
						className={`btn btn-primary ${
							images.length >= MAX_PHOTOS ? "btn-disabled" : ""
						}`}
					>
						<Image className="w-4 h-4 mr-2" />
						Wybierz plik
					</label>
				</div>
			</div>

			{images.length > 0 && (
				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
					{images.map((image, index) => (
						<div key={index} className="relative group">
							<img
								src={image.preview}
								alt={`Upload ${index + 1}`}
								className="w-full h-48 object-cover rounded-lg"
							/>
							<button
								onClick={() => removeImage(index)}
								className="absolute top-2 right-2 btn btn-circle btn-sm btn-error opacity-0 group-hover:opacity-100 transition-opacity"
							>
								<X className="w-4 h-4" />
							</button>
						</div>
					))}
				</div>
			)}

			<div className="flex justify-between mt-6">
				<button
					type="button"
					onClick={onBack}
					className="btn btn-ghost"
				>
					Powrot
				</button>
				<button
					type="button"
					onClick={handleSubmit}
					className="btn btn-primary"
					disabled={images.length === 0}
				>
					Dalej
				</button>
			</div>
		</div>
	);
};

export default MediaUpload;
