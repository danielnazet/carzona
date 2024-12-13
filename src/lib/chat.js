import { supabase } from "./supabase";

export const createChatRoom = async (listingId, buyerId, sellerId) => {
	try {
		// Check if chat room already exists
		const { data: existingRoom } = await supabase
			.from("chat_rooms")
			.select("id")
			.eq("listing_id", listingId)
			.eq("buyer_id", buyerId)
			.eq("seller_id", sellerId)
			.single();

		if (existingRoom) {
			return { data: existingRoom, error: null };
		}

		// Create new chat room
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
		return { data: null, error };
	}
};

export const fetchChatRoom = async (roomId, userId) => {
	try {
		const { data: room } = await supabase
			.from("chat_rooms")
			.select(
				`
        *,
        car_listings (
          id,
          title,
          price
        )
      `
			)
			.eq("id", roomId)
			.single();

		if (!room) {
			throw new Error("Chat room not found");
		}

		// Verify user has access to this room
		if (room.buyer_id !== userId && room.seller_id !== userId) {
			throw new Error("Unauthorized access");
		}

		return { data: room, error: null };
	} catch (error) {
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
        car_listings (
          id,
          title,
          price,
          car_images (
            image_url
          )
        ),
        buyer:profiles!chat_rooms_buyer_id_fkey (
          first_name,
          last_name
        ),
        seller:profiles!chat_rooms_seller_id_fkey (
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
		return { data: null, error };
	}
};

export const sendMessage = async (roomId, userId, content) => {
	try {
		const { error } = await supabase.from("chat_messages").insert({
			room_id: roomId,
			sender_id: userId,
			content: content.trim(),
		});

		return { error };
	} catch (error) {
		return { error };
	}
};
