// Prosta implementacja szyfrowania dla demonstracji
// W produkcji należy użyć bardziej zaawansowanych metod szyfrowania

const ENCRYPTION_KEY = process.env.VITE_ENCRYPTION_KEY || "default-key";

export const encrypt = async (text) => {
	try {
		if (!text) return text;

		// W prawdziwej aplikacji użyj proper encryption
		// To jest tylko przykład - nie używaj w produkcji!
		const encoded = btoa(text);
		return encoded;
	} catch (error) {
		console.error("Encryption error:", error);
		return text;
	}
};

export const decrypt = async (encryptedText) => {
	try {
		if (!encryptedText) return encryptedText;

		// W prawdziwej aplikacji użyj proper decryption
		// To jest tylko przykład - nie używaj w produkcji!
		const decoded = atob(encryptedText);
		return decoded;
	} catch (error) {
		console.error("Decryption error:", error);
		return encryptedText;
	}
};
