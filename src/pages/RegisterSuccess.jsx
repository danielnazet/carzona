import { Link } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { CheckCircle2, Mail } from "lucide-react";

const RegisterSuccess = () => {
	return (
		<MainLayout>
			<div className="min-h-screen bg-base-200 flex items-center justify-center px-4 sm:px-6 lg:px-8">
				<div className="max-w-md w-full text-center">
					<div className="card bg-base-100 shadow-xl">
						<div className="card-body items-center">
							<CheckCircle2 className="w-16 h-16 text-success mb-4" />
							<h2 className="card-title text-2xl mb-2">
								Registration Successful!
							</h2>
							<div className="flex items-center gap-2 text-base-content/70 mb-6">
								<Mail className="w-4 h-4" />
								<p>
									Please check your email to verify your
									account
								</p>
							</div>
							<Link
								to="/login"
								className="btn btn-primary w-full"
							>
								Proceed to Login
							</Link>
						</div>
					</div>
				</div>
			</div>
		</MainLayout>
	);
};

export default RegisterSuccess;
