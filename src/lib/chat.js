import { supabase } from "./supabase";

export const createChatRoom = async (listingId, buyerInfo, sellerId) => {
	if (!listingId || !sellerId) {
		return { data: null, error: new Error("Brak wymaganych parametrów") };
	}

	try {
		// Create new chat room
		const { data, error } = await supabase
			.from("chat_rooms")
			.insert({
				listing_id: listingId,
				seller_id: sellerId,
				is_anonymous: true,
				buyer_name: buyerInfo.name || "Gość",
				buyer_email: buyerInfo.email || "anonymous@example.com",
				created_at: new Date().toISOString(),
				updated_at: new Date().toISOString(),
			})
			.select()
			.single();

		if (error) {
			console.error("Supabase error:", error);
			throw error;
		}

		return { data, error: null };
	} catch (error) {
		console.error("Error creating chat room:", error);
		return {
			data: null,
			error: new Error(
				error.message || "Nie udało się utworzyć pokoju czatu"
			),
		};
	}
};

export const fetchChatRoom = async (roomId, userId) => {
	try {
		const { data: room, error: roomError } = await supabase
			.from("chat_rooms")
			.select(
				`
				*,
				listing:car_listings (
					id,
					title,
					price
				),
				buyer:profiles (
					id,
					first_name,
					last_name
				),
				seller:profiles (
					id,
					first_name,
					last_name
				)
			`
			)
			.eq("id", roomId)
			.single();

		if (roomError) throw roomError;
		if (!room) throw new Error("Chat room not found");

		// Check user access to room
		if (room.buyer_id !== userId && room.seller_id !== userId) {
			throw new Error("Unauthorized access");
		}

		return { data: room, error: null };
	} catch (error) {
		console.error("Error fetching chat room:", error);
		return { data: null, error };
	}
};

export const fetchUserChats = async (userId) => {
	try {
		const { data, error } = await supabase
			.from("chat_rooms")
			.select(
				`
				*,
				listing:car_listings (
					id,
					title,
					price
				),
				buyer:profiles (
					id,
					first_name,
					last_name
				),
				seller:profiles (
					id,
					first_name,
					last_name
				),
				chat_messages (
					content,
					created_at,
					sender_id
				)
			`
			)
			.or(`buyer_id.eq.${userId},seller_id.eq.${userId}`)
			.order("updated_at", { ascending: false });

		if (error) throw error;

		return {
			data: data.map((chat) => ({
				...chat,
				otherUser: chat.buyer_id === userId ? chat.seller : chat.buyer,
				lastMessage: chat.chat_messages[chat.chat_messages.length - 1],
			})),
			error: null,
		};
	} catch (error) {
		console.error("Error fetching user chats:", error);
		return { data: null, error };
	}
};

export const sendMessage = async (roomId, content, senderName = "Gość") => {
	try {
		const { data, error } = await supabase
			.from("chat_messages")
			.insert({
				room_id: roomId,
				content: content,
				sender_name: senderName,
				created_at: new Date().toISOString(),
			})
			.select()
			.single();

		if (error) {
			console.error("Supabase error:", error);
			throw error;
		}

		return { data, error: null };
	} catch (error) {
		console.error("Error sending message:", error);
		return { data: null, error };
	}
};
