import { supabase } from "./supabase";

export const createChatRoom = async (listingId, buyerId, sellerId) => {
	try {
		// Sprawdź, czy pokój czatu już istnieje
		const { data: existingRoom, error: existingRoomError } = await supabase
			.from("chat_rooms")
			.select("id")
			.eq("listing_id", listingId)
			.eq("buyer_id", buyerId)
			.eq("seller_id", sellerId)
			.single();

		if (existingRoomError && existingRoomError.code !== "PGRST116") {
			throw existingRoomError;
		}

		if (existingRoom) {
			return { data: existingRoom, error: null };
		}

		// Utwórz nowy pokój czatu
		const { data, error } = await supabase
			.from("chat_rooms")
			.insert({
				listing_id: listingId,
				buyer_id: buyerId,
				seller_id: sellerId,
			})
			.select()
			.single();

		return { data, error };
	} catch (error) {
		console.error("Błąd podczas tworzenia pokoju czatu:", error);
		return { data: null, error };
	}
};
export const fetchUserChats = async (userId) => {
	try {
		const { data, error } = await supabase
			.from("chat_rooms")
			.select(
				`
		  id,
		  car_listings (id, title, price),
		  buyer:auth.users(id, email),
		  seller:auth.users(id, email),
		  chat_messages (
			content,
			created_at,
			sender_id,
			read
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
				unreadMessages: chat.chat_messages.filter(
					(m) => !m.read && m.sender_id !== userId
				).length,
			})),
			error: null,
		};
	} catch (error) {
		console.error("Błąd podczas pobierania czatów użytkownika:", error);
		return { data: null, error };
	}
};

export const fetchChatRoom = async (roomId, userId) => {
	try {
		const { data: room, error: roomError } = await supabase
			.from("chat_rooms")
			.select(
				`
        *,
        car_listings (
          id,
          title,
          price
        ),
        buyer:auth.users(id, email),
        seller:auth.users(id, email)
      `
			)
			.eq("id", roomId)
			.single();

		if (roomError) throw roomError;
		if (!room) throw new Error("Pokój czatu nie został znaleziony");

		// Sprawdź dostęp użytkownika do pokoju
		if (room.buyer_id !== userId && room.seller_id !== userId) {
			throw new Error("Nieautoryzowany dostęp");
		}

		return {
			data: {
				...room,
				listing: room.car_listings,
				buyer: room.buyer,
				seller: room.seller,
			},
			error: null,
		};
	} catch (error) {
		console.error("Błąd podczas pobierania pokoju czatu:", error);
		return { data: null, error: error.message };
	}
};
