import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import MainLayout from "../layouts/MainLayout";
import { Car, AlertCircle } from "lucide-react";

const registerSchema = z
	.object({
		firstName: z
			.string()
			.min(2, "First name must be at least 2 characters"),
		lastName: z.string().min(2, "Last name must be at least 2 characters"),
		phone: z
			.string()
			.min(10, "Phone number must be at least 10 characters"),
		email: z.string().email("Invalid email address"),
		password: z.string().min(6, "Password must be at least 6 characters"),
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ["confirmPassword"],
	});

const Register = () => {
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(registerSchema),
	});

	const onSubmit = async (data) => {
		try {
			setIsLoading(true);
			setError("");

			// First, sign up the user with Supabase Auth
			const { data: authData, error: signUpError } =
				await supabase.auth.signUp({
					email: data.email,
					password: data.password,
					options: {
						data: {
							first_name: data.firstName,
							last_name: data.lastName,
							phone: data.phone,
						},
					},
				});

			if (signUpError) throw signUpError;

			if (authData?.user) {
				// After successful signup, insert into profiles table
				const { error: profileError } = await supabase
					.from("profiles")
					.insert({
						id: authData.user.id,
						first_name: data.firstName,
						last_name: data.lastName,
						phone: data.phone,
						email: data.email,
					})
					.select()
					.single();

				if (profileError) {
					console.error("Profile creation error:", profileError);
					throw new Error(
						"Failed to create profile. Please try again."
					);
				}

				// Navigate to success page
				navigate("/register-success");
			}
		} catch (err) {
			console.error("Registration error:", err);
			setError(err.message);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<MainLayout>
			<div className="min-h-screen bg-base-200 py-12 px-4 sm:px-6 lg:px-8">
				<div className="max-w-md mx-auto">
					<div className="text-center mb-8">
						<div className="flex justify-center mb-4">
							<Car className="h-12 w-12 text-primary" />
						</div>
						<h2 className="text-3xl font-bold">
							Create your account
						</h2>
						<p className="mt-2 text-base-content/70">
							Join Carzona to start your car journey
						</p>
					</div>

					<div className="card bg-base-100 shadow-xl">
						<div className="card-body">
							{error && (
								<div className="alert alert-error mb-6">
									<AlertCircle className="h-5 w-5" />
									<span>{error}</span>
								</div>
							)}

							<form
								onSubmit={handleSubmit(onSubmit)}
								className="space-y-6"
							>
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
									<div className="form-control">
										<label className="label">
											<span className="label-text">
												First Name
											</span>
										</label>
										<input
											type="text"
											{...register("firstName")}
											className="input input-bordered w-full"
											placeholder="John"
										/>
										{errors.firstName && (
											<label className="label">
												<span className="label-text-alt text-error">
													{errors.firstName.message}
												</span>
											</label>
										)}
									</div>

									<div className="form-control">
										<label className="label">
											<span className="label-text">
												Last Name
											</span>
										</label>
										<input
											type="text"
											{...register("lastName")}
											className="input input-bordered w-full"
											placeholder="Doe"
										/>
										{errors.lastName && (
											<label className="label">
												<span className="label-text-alt text-error">
													{errors.lastName.message}
												</span>
											</label>
										)}
									</div>
								</div>

								<div className="form-control">
									<label className="label">
										<span className="label-text">
											Phone Number
										</span>
									</label>
									<input
										type="tel"
										{...register("phone")}
										className="input input-bordered w-full"
										placeholder="+1234567890"
									/>
									{errors.phone && (
										<label className="label">
											<span className="label-text-alt text-error">
												{errors.phone.message}
											</span>
										</label>
									)}
								</div>

								<div className="form-control">
									<label className="label">
										<span className="label-text">
											Email
										</span>
									</label>
									<input
										type="email"
										{...register("email")}
										className="input input-bordered w-full"
										placeholder="you@example.com"
									/>
									{errors.email && (
										<label className="label">
											<span className="label-text-alt text-error">
												{errors.email.message}
											</span>
										</label>
									)}
								</div>

								<div className="form-control">
									<label className="label">
										<span className="label-text">
											Password
										</span>
									</label>
									<input
										type="password"
										{...register("password")}
										className="input input-bordered w-full"
										placeholder="••••••••"
									/>
									{errors.password && (
										<label className="label">
											<span className="label-text-alt text-error">
												{errors.password.message}
											</span>
										</label>
									)}
								</div>

								<div className="form-control">
									<label className="label">
										<span className="label-text">
											Confirm Password
										</span>
									</label>
									<input
										type="password"
										{...register("confirmPassword")}
										className="input input-bordered w-full"
										placeholder="••••••••"
									/>
									{errors.confirmPassword && (
										<label className="label">
											<span className="label-text-alt text-error">
												{errors.confirmPassword.message}
											</span>
										</label>
									)}
								</div>

								<button
									type="submit"
									className={`btn btn-primary w-full ${
										isLoading ? "loading" : ""
									}`}
									disabled={isLoading}
								>
									{isLoading
										? "Creating account..."
										: "Create account"}
								</button>
							</form>

							<div className="divider">or</div>

							<p className="text-center text-sm">
								Already have an account?{" "}
								<Link
									to="/login"
									className="text-primary hover:underline"
								>
									Sign in
								</Link>
							</p>
						</div>
					</div>
				</div>
			</div>
		</MainLayout>
	);
};

export default Register;
