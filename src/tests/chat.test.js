import { describe, test, expect } from "vitest";
import { createChatRoom, sendMessage } from "../lib/chat";

describe("Chat functionality", () => {
	test("should create chat room", async () => {
		const result = await createChatRoom(
			"listing123",
			"buyer123",
			"seller123"
		);
		expect(result).toBeDefined();
	});

	test("should send message", async () => {
		const result = await sendMessage("room123", "Test message");
		expect(result).toBeDefined();
	});
});
