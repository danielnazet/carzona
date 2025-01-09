import { useState } from "react";
import { Phone, Mail, User, Lock } from "lucide-react";
import ChatButton from "../chat/ChatButton";
import PropTypes from "prop-types";

const ContactInfo = ({ listing, seller }) => {
	const [showPhone, setShowPhone] = useState(false);
	const [showEmail, setShowEmail] = useState(false);

	return (
		<div className="space-y-4">
			<h2 className="text-xl font-semibold">Kontakt</h2>

			<ChatButton listing={listing} sellerId={seller.id} />

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
						Prywatny sprzedawca
					</p>
				</div>
			</div>

			<div className="space-y-3">
				<button
					onClick={() => setShowPhone(!showPhone)}
					className="btn btn-outline btn-block"
				>
					<Phone className="w-4 h-4 mr-2" />
					{showPhone ? seller.phone : "Pokaż numer telefonu"}
				</button>

				<button
					onClick={() => setShowEmail(!showEmail)}
					className="btn btn-outline btn-block"
				>
					<Mail className="w-4 h-4 mr-2" />
					{showEmail ? seller.email : "Pokaż email"}
				</button>
			</div>
		</div>
	);
};

ContactInfo.propTypes = {
	listing: PropTypes.shape({
		id: PropTypes.string.isRequired,
	}).isRequired,
	seller: PropTypes.shape({
		id: PropTypes.string.isRequired,
		first_name: PropTypes.string.isRequired,
		last_name: PropTypes.string.isRequired,
		phone: PropTypes.string.isRequired,
		email: PropTypes.string.isRequired,
	}).isRequired,
};

export default ContactInfo;
