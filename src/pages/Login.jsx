import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import MainLayout from "../layouts/MainLayout";
import { Car, AlertCircle, Mail, Lock } from "lucide-react";

const loginSchema = z.object({
	email: z.string().email("Invalid email address"),
	password: z.string().min(6, "Password must be at least 6 characters"),
});

const Login = () => {
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(loginSchema),
	});

	const onSubmit = async (data) => {
		try {
			setIsLoading(true);
			setError("");

			const { error: signInError } =
				await supabase.auth.signInWithPassword({
					email: data.email,
					password: data.password,
				});

			if (signInError) throw signInError;

			// Since email confirmation is disabled, redirect to welcome page
			navigate("/welcome");
		} catch (err) {
			console.error("Login error:", err);
			setError("Invalid email or password");
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
						<h2 className="text-3xl font-bold">Welcome back</h2>
						<p className="mt-2 text-base-content/70">
							Sign in to your account
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
								<div className="form-control">
									<label className="label">
										<span className="label-text flex items-center gap-2">
											<Mail className="h-4 w-4" />
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
										<span className="label-text flex items-center gap-2">
											<Lock className="h-4 w-4" />
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
									<label className="label">
										<Link
											to="/forgot-password"
											className="label-text-alt link link-hover"
										>
											Forgot password?
										</Link>
									</label>
								</div>

								<button
									type="submit"
									className={`btn btn-primary w-full ${
										isLoading ? "loading" : ""
									}`}
									disabled={isLoading}
								>
									{isLoading ? "Signing in..." : "Sign in"}
								</button>
							</form>

							<div className="divider">or</div>

							<p className="text-center text-sm">
								Don't have an account?{" "}
								<Link
									to="/signup"
									className="text-primary hover:underline"
								>
									Create account
								</Link>
							</p>
						</div>
					</div>
				</div>
			</div>
		</MainLayout>
	);
};

export default Login;
