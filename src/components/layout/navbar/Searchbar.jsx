import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

const SearchBar = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		if (searchTerm.trim()) {
			navigate(`/browse?search=${encodeURIComponent(searchTerm.trim())}`);
			setSearchTerm("");
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="hidden lg:block flex-1 max-w-xl mx-8"
		>
			<div className="relative">
				<input
					type="text"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					placeholder="Szukaj..."
					className="input input-bordered w-full h-10 pl-10 pr-4 bg-base-100/50 focus:bg-white text-sm"
				/>
				<button
					type="submit"
					className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/50 hover:text-primary transition-colors"
				>
					<Search className="w-4 h-4" />
				</button>
			</div>
		</form>
	);
};

export default SearchBar;
