import { render, screen, waitFor, within } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Task2 from "../components/Tasks/Task-2";
import "@testing-library/jest-dom";

const renderWithRouter = (component: React.ReactElement) => {
	return render(<BrowserRouter>{component}</BrowserRouter>);
};

const mockWeatherData = {
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

describe("Task2 Component Integration", () => {
	beforeEach(() => {
		jest.clearAllMocks();
		(global.fetch as jest.Mock).mockReset();
	});

	it("should show loading state initially", () => {
		(global.fetch as jest.Mock).mockImplementation(
			// biome-ignore lint/suspicious/noEmptyBlockStatements: <Never resolves>
			() => new Promise(() => {}),
		);

		renderWithRouter(<Task2 />);

		expect(screen.getByText("Loading weather data...")).toBeInTheDocument();
	});

	it("should display error message when fetch fails", async () => {
		(global.fetch as jest.Mock).mockRejectedValueOnce(
			new Error("Network error"),
		);

		renderWithRouter(<Task2 />);

		await waitFor(() => {
			expect(screen.getByText("Error: Network error")).toBeInTheDocument();
		});

		await waitFor(() => {
			expect(
				screen.queryByText("Loading weather data..."),
			).not.toBeInTheDocument();
		});
	});

	it("should display error for HTTP error responses", async () => {
		(global.fetch as jest.Mock).mockResolvedValueOnce({
			ok: false,
			status: 404,
		});

		renderWithRouter(<Task2 />);

		await waitFor(() => {
			expect(
				screen.getByText(/Error:.*Failed to fetch weather data: 404/),
			).toBeInTheDocument();
		});
	});

	it("should call API with correct URL", () => {
		// biome-ignore lint/suspicious/noEmptyBlockStatements: <never resolves>
		(global.fetch as jest.Mock).mockImplementation(() => new Promise(() => {}));

		renderWithRouter(<Task2 />);

		expect(global.fetch).toHaveBeenCalledWith(
			"https://api.openweathermap.org/data/2.5/weather?q=London&appid=0031d758ba088e9167c5079fc6515b39&units=metric&lang=en",
		);
	});

	it("should display weather icon", async () => {
		(global.fetch as jest.Mock).mockResolvedValueOnce({
			ok: true,
			json: async () => mockWeatherData,
		});

		renderWithRouter(<Task2 />);

		await waitFor(() => {
			const weatherIcon = screen.getByAltText("broken clouds");
			expect(weatherIcon).toBeInTheDocument();
			expect(weatherIcon).toHaveAttribute(
				"src",
				"https://openweathermap.org/img/wn/04d@2x.png",
			);
		});
	});

	it("should handle invalid JSON response", async () => {
		(global.fetch as jest.Mock).mockResolvedValueOnce({
			ok: true,
			json: async () => {
				throw new Error("Invalid JSON");
			},
		});

		renderWithRouter(<Task2 />);

		await waitFor(() => {
			expect(screen.getByText("Error: Invalid JSON")).toBeInTheDocument();
		});

		await waitFor(() => {
			expect(
				screen.queryByText("Loading weather data..."),
			).not.toBeInTheDocument();
		});
	});

	it("should handle missing weather data fields gracefully", async () => {
		const incompleteData = {
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
			// Missing visibility
		};

		(global.fetch as jest.Mock).mockImplementation(() =>
			Promise.resolve({ ok: true, json: async () => incompleteData }),
		);

		renderWithRouter(<Task2 />);

		await waitFor(() => {
			expect(screen.getByText("London")).toBeInTheDocument();
		});

		// Should still display available data
		expect(screen.getByText("15.5°C")).toBeInTheDocument();
		expect(screen.getByText("3.6 m/s")).toBeInTheDocument();
	});

	it("should handle zero values correctly", async () => {
		const zeroData = {
			...mockWeatherData,
			main: {
				temp: 0,
				feels_like: 0,
				humidity: 0,
				pressure: 0,
			},
			wind: {
				speed: 0,
			},
			visibility: 0,
		};

		(global.fetch as jest.Mock).mockResolvedValueOnce({
			ok: true,
			json: async () => zeroData,
		});

		renderWithRouter(<Task2 />);

		await waitFor(() => {
			expect(
				screen.getAllByText(
					(content, element) =>
						content.includes("0") && !!element?.textContent?.includes("°C"),
				),
			).toHaveLength(2);
		});
		const humSection = screen
			.getByText("Humidity")
			.closest("div") as HTMLElement;
		expect(within(humSection).getByText("0%")).toBeInTheDocument();

		const presSection = screen
			.getByText("Pressure:")
			.closest("div") as HTMLElement;
		expect(within(presSection).getByText("0 hPa")).toBeInTheDocument();

		const windSection = screen.getByText("Wind").closest("div") as HTMLElement;
		expect(within(windSection).getByText("0 m/s")).toBeInTheDocument();

		const visSection = screen
			.getByText("Visibility")
			.closest("div") as HTMLElement;
		expect(within(visSection).getByText("0.0 km")).toBeInTheDocument();
	});

	it("should handle negative temperature values", async () => {
		const coldData = {
			...mockWeatherData,
			main: {
				...mockWeatherData.main,
				temp: -5.5,
				feels_like: -8.2,
			},
		};

		(global.fetch as jest.Mock).mockResolvedValueOnce({
			ok: true,
			json: async () => coldData,
		});

		renderWithRouter(<Task2 />);

		await waitFor(() => {
			expect(
				screen.getByText(
					(content, element) =>
						content.includes("-5.5") && !!element?.textContent?.includes("°C"),
				),
			).toBeInTheDocument();
		});

		expect(
			screen.getByText(
				(content, element) =>
					content.includes("Feels like") &&
					!!element?.textContent?.includes("-8.2") &&
					!!element?.textContent?.includes("°C"),
			),
		).toBeInTheDocument();
	});
});
