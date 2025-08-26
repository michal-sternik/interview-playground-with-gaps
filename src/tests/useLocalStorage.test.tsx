import { act, renderHook } from "@testing-library/react";
import { useLocalStorage } from "../components/Tasks/Task-4";

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
		localStorage.setItem(testKey, "de");

		const { result } = renderHook(() => useLocalStorage(testKey, "en"));

		expect(result.current[0]).toBe("de");
	});

	it("should update localStorage when setValue is called", () => {
		const { result } = renderHook(() => useLocalStorage(testKey, "en"));

		act(() => {
			result.current[1]("de");
		});

		expect(localStorage.setItem).toHaveBeenCalledWith(testKey, "de");
		expect(result.current[0]).toBe("de");
	});

	it("should handle non existent values correctly", () => {
		localStorage.removeItem(testKey);

		const { result } = renderHook(() => useLocalStorage(testKey, "en"));

		expect(result.current[0]).toBe("en");
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
});
