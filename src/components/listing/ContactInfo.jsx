import { useState } from "react";
import { Phone, Mail, User, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const ContactInfo = ({ seller }) => {
	const { user, loading } = useAuth();
	const [showPhone, setShowPhone] = useState(false);
	const [showEmail, setShowEmail] = useState(false);

	if (!seller) return null;

	if (loading) {
		return (
			<div className="card bg-base-100 shadow-xl">
				<div className="card-body items-center">
					<span className="loading loading-spinner loading-lg text-primary"></span>
				</div>
			</div>
		);
	}

	if (!user) {
		return (
			<div className="card bg-base-100 shadow-xl">
				<div className="card-body">
					<h2 className="text-xl font-semibold mb-4">
						Seller Information
					</h2>
					<div className="flex items-center gap-3 mb-4">
						<div className="avatar placeholder">
							<div className="w-12 h-12 rounded-full bg-primary/10">
								<User className="w-6 h-6 text-primary" />
							</div>
						</div>
						<div>
							<p className="font-medium">
								{seller.first_name} {seller.last_name}
							</p>
							<p className="text-sm text-base-content/70">
								Private Seller
							</p>
						</div>
					</div>

					<div className="alert alert-info mb-4">
						<Lock className="w-4 h-4" />
						<span>Sign in to view contact information</span>
					</div>

					<div className="space-y-3">
						<Link to="/login" className="btn btn-primary btn-block">
							Sign In
						</Link>
						<Link
							to="/signup"
							className="btn btn-outline btn-block"
						>
							Create Account
						</Link>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="card bg-base-100 shadow-xl">
			<div className="card-body">
				<h2 className="text-xl font-semibold mb-4">
					Seller Information
				</h2>
				<div className="flex items-center gap-3 mb-4">
					<div className="avatar placeholder">
						<div className="w-12 h-12 rounded-full bg-primary/10">
							<User className="w-6 h-6 text-primary" />
						</div>
					</div>
					<div>
						<p className="font-medium">
							{seller.first_name} {seller.last_name}
						</p>
						<p className="text-sm text-base-content/70">
							Private Seller
						</p>
					</div>
				</div>

				<div className="space-y-3">
					<button
						onClick={() => setShowPhone(!showPhone)}
						className="btn btn-primary btn-block"
					>
						<Phone className="w-4 h-4 mr-2" />
						{showPhone ? seller.phone : "Show Phone Number"}
					</button>
					<button
						onClick={() => setShowEmail(!showEmail)}
						className="btn btn-outline btn-block"
					>
						<Mail className="w-4 h-4 mr-2" />
						{showEmail ? seller.email : "Show Email"}
					</button>
				</div>
			</div>
		</div>
	);
};

export default ContactInfo;
