import { act, renderHook } from "@testing-library/react";

import { useDebounce } from "../components/Tasks/Task-3";

// Mock useDebounce hook for testing
// function useDebounce(value: string, delay: number): string {
//   const [debouncedValue, setDebouncedValue] = useState<string>("");

//   useEffect(() => {
//     const timeout = setTimeout(() => {
//       setDebouncedValue(value);
//     }, delay);

//     return () => clearTimeout(timeout);
//   }, [value, delay]);

//   return debouncedValue;
// }

describe("useDebounce Hook", () => {
	beforeEach(() => {
		jest.useFakeTimers();
	});

	afterEach(() => {
		jest.useRealTimers();
	});

	it("should return empty string initially", () => {
		const { result } = renderHook(() => useDebounce("test", 500));

		expect(result.current).toBe("");
	});

	it("should debounce value changes", () => {
		const { result } = renderHook(
			({ value, delay }) => useDebounce(value, delay),
			{ initialProps: { value: "initial", delay: 500 } },
		);

		expect(result.current).toBe("");

		// Fast forward time but not enough to trigger debounce
		act(() => {
			jest.advanceTimersByTime(400);
		});

		expect(result.current).toBe("");

		// Complete the delay
		act(() => {
			jest.advanceTimersByTime(100);
		});

		expect(result.current).toBe("initial");
	});

	it("should reset timer when value changes", () => {
		const { result, rerender } = renderHook(
			({ value, delay }) => useDebounce(value, delay),
			{ initialProps: { value: "first", delay: 500 } },
		);

		// Advance time partially
		act(() => {
			jest.advanceTimersByTime(300);
		});

		// Change value before delay completes
		rerender({ value: "second", delay: 500 });

		// Advance to where first timer would have completed
		act(() => {
			jest.advanceTimersByTime(200);
		});

		// Should still be empty because timer was reset
		expect(result.current).toBe("");

		// Complete the new timer
		act(() => {
			jest.advanceTimersByTime(300);
		});

		expect(result.current).toBe("second");
	});

	it("should handle multiple rapid value changes", () => {
		const { result, rerender } = renderHook(
			({ value, delay }) => useDebounce(value, delay),
			{ initialProps: { value: "a", delay: 500 } },
		);

		// Simulate rapid typing
		rerender({ value: "ab", delay: 500 });
		act(() => {
			jest.advanceTimersByTime(100);
		});

		rerender({ value: "abc", delay: 500 });
		act(() => {
			jest.advanceTimersByTime(100);
		});

		rerender({ value: "abcd", delay: 500 });
		act(() => {
			jest.advanceTimersByTime(100);
		});

		rerender({ value: "abcde", delay: 500 });

		// Should still be empty
		expect(result.current).toBe("");

		// Complete the delay
		act(() => {
			jest.advanceTimersByTime(500);
		});

		// Should have the final value
		expect(result.current).toBe("abcde");
	});

	it("should handle delay changes", () => {
		const { result, rerender } = renderHook(
			({ value, delay }) => useDebounce(value, delay),
			{ initialProps: { value: "test", delay: 1000 } },
		);

		// Advance time partially
		act(() => {
			jest.advanceTimersByTime(500);
		});

		// Change delay
		rerender({ value: "test", delay: 200 });

		// The timer should be reset with new delay
		act(() => {
			jest.advanceTimersByTime(200);
		});

		expect(result.current).toBe("test");
	});

	it("should handle zero delay", () => {
		const { result } = renderHook(() => useDebounce("immediate", 0));

		act(() => {
			jest.advanceTimersByTime(0);
		});

		expect(result.current).toBe("immediate");
	});

	it("should handle negative delay", () => {
		const { result } = renderHook(() => useDebounce("negative", -100));

		act(() => {
			jest.advanceTimersByTime(0);
		});

		expect(result.current).toBe("negative");
	});

	it("should handle empty string values", () => {
		const { result, rerender } = renderHook(
			({ value, delay }) => useDebounce(value, delay),
			{ initialProps: { value: "", delay: 500 } },
		);

		act(() => {
			jest.advanceTimersByTime(500);
		});

		expect(result.current).toBe("");

		rerender({ value: "not empty", delay: 500 });

		act(() => {
			jest.advanceTimersByTime(500);
		});

		expect(result.current).toBe("not empty");

		rerender({ value: "", delay: 500 });

		act(() => {
			jest.advanceTimersByTime(500);
		});

		expect(result.current).toBe("");
	});

	it("should handle special characters and unicode", () => {
		const specialValue = "🚀 Special chars: @#$%^&*()";
		const { result } = renderHook(() => useDebounce(specialValue, 300));

		act(() => {
			jest.advanceTimersByTime(300);
		});

		expect(result.current).toBe(specialValue);
	});

	it("should handle very long delay", () => {
		const { result } = renderHook(() => useDebounce("long delay", 10000));

		act(() => {
			jest.advanceTimersByTime(9999);
		});

		expect(result.current).toBe("");

		act(() => {
			jest.advanceTimersByTime(1);
		});

		expect(result.current).toBe("long delay");
	});

	it("should cleanup timeout on unmount", () => {
		const clearTimeoutSpy = jest.spyOn(global, "clearTimeout");

		const { unmount } = renderHook(() => useDebounce("cleanup test", 500));

		unmount();

		expect(clearTimeoutSpy).toHaveBeenCalled();

		clearTimeoutSpy.mockRestore();
	});

	it("should handle same value multiple times", () => {
		const { result, rerender } = renderHook(
			({ value, delay }) => useDebounce(value, delay),
			{ initialProps: { value: "same", delay: 500 } },
		);

		act(() => {
			jest.advanceTimersByTime(500);
		});

		expect(result.current).toBe("same");

		// Set same value again
		rerender({ value: "same", delay: 500 });

		act(() => {
			jest.advanceTimersByTime(500);
		});

		expect(result.current).toBe("same");
	});
});
