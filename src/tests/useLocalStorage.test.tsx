import { act, renderHook } from "@testing-library/react";
import { useLocalStorage } from "../components/Tasks/Task-1";

jest.mock("nanoid", () => ({
	nanoid: () => `${Date.now()}-${Math.random().toString(36).slice(2)}`,
}));

describe("useLocalStorage Hook", () => {
	const testKey = "test-language";

	beforeEach(() => {
		localStorage.clear();
		jest.clearAllMocks();
		// Reset all mocks to their original implementations
		jest.restoreAllMocks();
	});

	it("should return default value when localStorage is empty", () => {
		const { result } = renderHook(() => useLocalStorage(testKey, "en"));

		expect(result.current[0]).toBe("en");
	});

	it("should return value from localStorage when available", () => {
		localStorage.setItem(testKey, JSON.stringify("de"));

		const { result } = renderHook(() => useLocalStorage(testKey, "en"));

		expect(result.current[0]).toBe("de");
	});

	it("should update localStorage when setValue is called", () => {
		const { result } = renderHook(() => useLocalStorage(testKey, "en"));

		act(() => {
			result.current[1]("de");
		});

		expect(localStorage.setItem).toHaveBeenCalledWith(testKey, '"de"');
		expect(result.current[0]).toBe("de");
	});

	it("should handle corrupted localStorage data gracefully", () => {
		localStorage.setItem(testKey, "invalid-json");
		const consoleSpy = jest.spyOn(console, "error").mockImplementation();

		const { result } = renderHook(() => useLocalStorage(testKey, "en"));

		expect(result.current[0]).toBe("en");
		expect(consoleSpy).toHaveBeenCalledWith(
			expect.stringContaining(`Error reading localStorage key "${testKey}"`),
			expect.any(Error),
		);

		consoleSpy.mockRestore();
	});

	it("should handle localStorage setItem errors", () => {
		const consoleSpy = jest.spyOn(console, "error").mockImplementation();

		// Mock localStorage.setItem to throw error
		const originalSetItem = localStorage.setItem;
		localStorage.setItem = jest.fn().mockImplementation(() => {
			throw new Error("Storage quota exceeded");
		});

		const { result } = renderHook(() => useLocalStorage(testKey, "en"));

		act(() => {
			result.current[1]("de");
		});

		expect(consoleSpy).toHaveBeenCalledWith(
			expect.stringContaining(`Error setting localStorage key "${testKey}"`),
			expect.any(Error),
		);

		// Restore
		localStorage.setItem = originalSetItem;
		consoleSpy.mockRestore();
	});

	it("should handle null values correctly", () => {
		localStorage.setItem(testKey, JSON.stringify(null));

		const { result } = renderHook(() => useLocalStorage(testKey, "en"));

		expect(result.current[0]).toBe("en");
	});

	it("should handle empty string in localStorage", () => {
		localStorage.setItem(testKey, '""');

		const { result } = renderHook(() => useLocalStorage(testKey, "en"));

		expect(result.current[0]).toBe("");
	});

	it("should update state multiple times correctly", () => {
		const { result } = renderHook(() => useLocalStorage(testKey, "en"));

		act(() => {
			result.current[1]("de");
		});
		expect(result.current[0]).toBe("de");

		act(() => {
			result.current[1]("en");
		});
		expect(result.current[0]).toBe("en");
	});

	it("should handle localStorage getItem returning null", () => {
		(localStorage.getItem as jest.Mock).mockReturnValue(null);

		const { result } = renderHook(() => useLocalStorage(testKey, "de"));

		expect(result.current[0]).toBe("de");
	});

	it("should handle localStorage getItem throwing an error", () => {
		const consoleSpy = jest.spyOn(console, "error").mockImplementation();
		(localStorage.getItem as jest.Mock).mockImplementation(() => {
			throw new Error("LocalStorage not available");
		});

		const { result } = renderHook(() => useLocalStorage(testKey, "en"));

		expect(result.current[0]).toBe("en");
		expect(consoleSpy).toHaveBeenCalled();

		consoleSpy.mockRestore();
	});
});
