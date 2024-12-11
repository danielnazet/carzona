import { AlertTriangle } from "lucide-react";

const SafetyTips = () => {
	return (
		<div className="card bg-base-100 shadow-xl">
			<div className="card-body">
				<div className="flex items-center gap-2 mb-4">
					<AlertTriangle className="w-5 h-5 text-warning" />
					<h2 className="text-xl font-semibold">Safety Tips</h2>
				</div>
				<ul className="space-y-2 text-sm text-base-content/70">
					<li>• Meet in a safe, public location</li>
					<li>• Don't make wire transfers</li>
					<li>• Inspect the vehicle before buying</li>
					<li>• Verify all documentation</li>
					<li>• Consider a professional inspection</li>
				</ul>
			</div>
		</div>
	);
};

export default SafetyTips;
