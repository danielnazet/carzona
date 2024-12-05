import { useState, useEffect } from "react";
import { Search } from "lucide-react";

const SearchBar = ({ onSearch, initialValue = "" }) => {
	const [searchTerm, setSearchTerm] = useState(initialValue);

	useEffect(() => {
		setSearchTerm(initialValue);
	}, [initialValue]);

	const handleSubmit = (e) => {
		e.preventDefault();
		onSearch(searchTerm);
	};

	return (
		<form onSubmit={handleSubmit} className="w-full">
			<div className="relative">
				<input
					type="text"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					placeholder="Search by make, model, or keyword..."
					className="input input-bordered w-full pl-12 h-14 text-lg"
				/>
				<button
					type="submit"
					className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/50 hover:text-primary transition-colors"
				>
					<Search className="w-5 h-5" />
				</button>
			</div>
		</form>
	);
};

export default SearchBar;
