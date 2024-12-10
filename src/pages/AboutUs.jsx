import React from "react";
import Navbar from "../components/layout/Navbar";

const AboutUs = () => {
	const timelineEvents = [
		{
			year: "2024",
			description:
				"Założenie firmy i uruchomienie marketplace samochodów.",
		},
		{
			year: "2025",
			description:
				"Pierwsza współpraca z dużymi markami motoryzacyjnymi.",
		},
		{ year: "2026", description: "Rozszerzenie na międzynarodowy rynek." },
	];
	return (
		<div className="bg-neutral">
			<Navbar />
			<div className="about-us-container p-6 max-w-4xl mx-auto text-center text-white shadow-lg rounded-lg mt-10">
				<h1 className="text-4xl font-bold text-gray-200 mb-6">O nas</h1>
				<p className="text-lg leading-relaxed text-gray-200 mb-4">
					Witamy na naszym marketplace samochodowym! Jesteśmy nową
					firmą założoną w 2024 roku, z misją stworzenia miejsca,
					gdzie każdy znajdzie idealny pojazd dla siebie. Umożliwiamy
					łatwy kontakt z nami, ponieważ cenimy opinie naszych
					użytkowników — zarówno te pozytywne, jak i krytyczne.
				</p>
				<div className="timeline-container my-12 px-4">
					<h2 className="text-3xl font-bold text-center mb-8">
						Nasza historia
					</h2>
					<div className="relative">
						<div className="border-l-2 border-gray-200 pl-8">
							{timelineEvents.map((event, index) => (
								<div key={index} className="mb-6">
									<div className="text-xl font-semibold text-gray-200">
										{event.year}
									</div>
									<p className="text-lg text-gray-200">
										{event.description}
									</p>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AboutUs;
