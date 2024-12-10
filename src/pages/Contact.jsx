import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import Navbar from "../components/layout/Navbar";

const Contact = () => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		message: "",
	});

	const [isSent, setIsSent] = useState(false);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		emailjs
			.send(
				"service_h0q9ttk", // Zamień na swój Service ID
				"template_u77k546", // Zamień na swój Template ID
				formData,
				"POyUrzBbEO21T8TWE" // Zamień na swój Public Key
			)
			.then(
				(result) => {
					console.log("Email sent successfully:", result.text);
					setIsSent(true);
					setFormData({ name: "", email: "", message: "" });
				},
				(error) => {
					console.error("Failed to send email:", error.text);
				}
			);
	};

	return (
		<div>
			<Navbar />
			<footer className="pt-20 bg-neutral text-white min-h-screen flex items-center justify-center py-10">
				<div className="container mx-auto px-6 text-center">
					<h2 className="text-2xl font-bold mb-4">Get in Touch!</h2>
					<p className="mb-6 text-gray-200">
						Chcesz współpracować? Oferujemy możliwość sponsoringu i
						umieszczania reklam na naszej stronie. Dołącz do nas i
						wspólnie budujmy lepsze doświadczenie dla wszystkich
						miłośników motoryzacji!
					</p>
					{isSent && (
						<p className="text-green-500 font-semibold mb-4">
							Your message has been sent successfully!
						</p>
					)}
					<form onSubmit={handleSubmit} className="max-w-md mx-auto">
						<div className="mb-4">
							<input
								type="text"
								name="name"
								placeholder="Imie i Nazwisko"
								value={formData.from_name}
								onChange={(e) =>
									setFormData({
										...formData,
										from_name: e.target.value,
									})
								}
								className="w-full px-4 py-2 rounded-md bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
								required
							/>
						</div>
						<div className="mb-4">
							<input
								type="email"
								name="email"
								placeholder="E-mail"
								value={formData.email}
								onChange={handleChange}
								className="w-full px-4 py-2 rounded-md bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
								required
							/>
						</div>
						<div className="mb-4">
							<textarea
								name="message"
								rows="4"
								placeholder="Tutaj napisz wiadomosc"
								value={formData.message}
								onChange={(e) =>
									setFormData({
										...formData,
										message: e.target.value,
									})
								}
								className="w-full px-4 py-2 rounded-md bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
								required
							></textarea>
						</div>
						<button
							type="submit"
							className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition duration-300"
						>
							Wyslij wiadomosc
						</button>
					</form>
					<p className="text-gray-500 text-sm mt-6">
						&copy; 2024 Carzone. All rights reserved.
					</p>
				</div>
			</footer>
		</div>
	);
};

export default Contact;
