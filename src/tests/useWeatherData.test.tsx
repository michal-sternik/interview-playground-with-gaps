import { renderHook, waitFor } from "@testing-library/react";
// Import types from Task-2
import type { WeatherData } from "../components/Tasks/Task-2";
import { useWeatherData } from "../components/Tasks/Task-2";

describe("useWeatherData Hook", () => {
	beforeEach(() => {
		jest.clearAllMocks();
		(global.fetch as jest.Mock).mockReset();
	});

	const mockWeatherData: WeatherData = {
		name: "London",
		main: {
			temp: 15.5,
			feels_like: 14.2,
			humidity: 72,
			pressure: 1013,
		},
		weather: [
			{
				main: "Clouds",
				description: "broken clouds",
				icon: "04d",
			},
		],
		wind: {
			speed: 3.6,
		},
		visibility: 10000,
	};

	it("should start with loading true and no data", () => {
		(global.fetch as jest.Mock).mockImplementation(
			// biome-ignore lint/suspicious/noEmptyBlockStatements: <Never resolves to keep loading state>
			() => new Promise(() => {}),
		);

		const { result } = renderHook(() => useWeatherData("London"));

		expect(result.current.loading).toBe(true);
		expect(result.current.data).toBe(null);
		expect(result.current.error).toBe(null);
	});

	it("should fetch weather data successfully", async () => {
		(global.fetch as jest.Mock).mockResolvedValueOnce({
			ok: true,
			json: async () => mockWeatherData,
		});

		const { result } = renderHook(() => useWeatherData("London"));

		await waitFor(() => {
			expect(result.current.loading).toBe(false);
		});

		expect(result.current.data).toEqual(mockWeatherData);
		expect(result.current.error).toBe(null);
		expect(global.fetch).toHaveBeenCalledWith(
			"https://api.openweathermap.org/data/2.5/weather?q=London&appid=0031d758ba088e9167c5079fc6515b39&units=metric&lang=en",
		);
	});

	it("should handle fetch errors", async () => {
		(global.fetch as jest.Mock).mockRejectedValueOnce(
			new Error("Network error"),
		);

		const { result } = renderHook(() => useWeatherData("London"));

		await waitFor(() => {
			expect(result.current.loading).toBe(false);
		});

		expect(result.current.data).toBe(null);
		expect(result.current.error).toBe("Network error");
	});

	it("should handle HTTP error responses", async () => {
		(global.fetch as jest.Mock).mockResolvedValueOnce({
			ok: false,
			status: 404,
		});

		const { result } = renderHook(() => useWeatherData("NonExistentCity"));

		await waitFor(() => {
			expect(result.current.loading).toBe(false);
		});

		expect(result.current.data).toBe(null);
		expect(result.current.error).toBe("Failed to fetch weather data: 404");
	});

	it("should handle empty city name", async () => {
		const { result } = renderHook(() => useWeatherData(""));

		await waitFor(() => {
			expect(result.current.loading).toBe(false);
		});

		expect(result.current.data).toBe(null);
		expect(result.current.error).toBe("City name is required");
		expect(global.fetch).not.toHaveBeenCalled();
	});

	it("should handle whitespace-only city name", async () => {
		const { result } = renderHook(() => useWeatherData("   "));

		await waitFor(() => {
			expect(result.current.loading).toBe(false);
		});

		expect(result.current.data).toBe(null);
		expect(result.current.error).toBe("City name is required");
		expect(global.fetch).not.toHaveBeenCalled();
	});

	it("should refetch when city changes", async () => {
		(global.fetch as jest.Mock)
			.mockResolvedValueOnce({
				ok: true,
				json: async () => ({ ...mockWeatherData, name: "London" }),
			})
			.mockResolvedValueOnce({
				ok: true,
				json: async () => ({ ...mockWeatherData, name: "Paris" }),
			});

		const { result, rerender } = renderHook(
			({ city }) => useWeatherData(city),
			{ initialProps: { city: "London" } },
		);

		await waitFor(() => {
			expect(result.current.loading).toBe(false);
		});

		expect(result.current.data?.name).toBe("London");

		rerender({ city: "Paris" });

		await waitFor(() => {
			expect(result.current.loading).toBe(false);
		});

		expect(result.current.data?.name).toBe("Paris");
		expect(global.fetch).toHaveBeenCalledTimes(2);
	});

	it("should handle JSON parsing errors", async () => {
		(global.fetch as jest.Mock).mockResolvedValueOnce({
			ok: true,
			json: async () => {
				throw new Error("Invalid JSON");
			},
		});

		const { result } = renderHook(() => useWeatherData("London"));

		await waitFor(() => {
			expect(result.current.loading).toBe(false);
		});

		expect(result.current.data).toBe(null);
		expect(result.current.error).toBe("Invalid JSON");
	});

	it("should handle non-Error exceptions", async () => {
		(global.fetch as jest.Mock).mockRejectedValueOnce("String error");

		const { result } = renderHook(() => useWeatherData("London"));

		await waitFor(() => {
			expect(result.current.loading).toBe(false);
		});

		expect(result.current.data).toBe(null);
		expect(result.current.error).toBe("String error");
	});

	it("should reset error state when city changes", async () => {
		(global.fetch as jest.Mock)
			.mockRejectedValueOnce(new Error("Network error"))
			.mockResolvedValueOnce({
				ok: true,
				json: async () => mockWeatherData,
			});

		const { result, rerender } = renderHook(
			({ city }) => useWeatherData(city),
			{ initialProps: { city: "InvalidCity" } },
		);

		await waitFor(() => {
			expect(result.current.error).toBe("Network error");
		});

		rerender({ city: "London" });

		expect(result.current.error).toBe(null);
		expect(result.current.loading).toBe(true);

		await waitFor(() => {
			expect(result.current.loading).toBe(false);
		});

		expect(result.current.data).toEqual(mockWeatherData);
		expect(result.current.error).toBe(null);
	});
});
