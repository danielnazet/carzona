import { Link } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { CheckCircle2, ArrowRight } from "lucide-react";

const ListingSuccess = () => {
	return (
		<MainLayout>
			<div className="min-h-screen bg-base-200 flex items-center justify-center px-4 sm:px-6 lg:px-8">
				<div className="max-w-md w-full text-center">
					<div className="card bg-base-100 shadow-xl">
						<div className="card-body items-center">
							<CheckCircle2 className="w-16 h-16 text-success mb-4" />
							<h2 className="card-title text-2xl mb-2">
								Ogłoszenie zostało pomyślnie utworzone!
							</h2>
							<p className="text-base-content/70 mb-6">
								Twoje ogłoszenie samochodu zostało opublikowane
								i jest teraz widoczne dla potencjalnych
								nabywców.
							</p>
							<div className="space-y-3 w-full">
								<Link
									to="/my-listings"
									className="btn btn-primary w-full"
								>
									Zobacz Swoje ogłoszenia
									<ArrowRight className="w-4 h-4 ml-2" />
								</Link>
								<Link to="/" className="btn btn-ghost w-full">
									Wróć do strony głównej
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</MainLayout>
	);
};

export default ListingSuccess;
