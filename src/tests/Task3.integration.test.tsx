import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { act } from "react";
import { BrowserRouter } from "react-router-dom";
import Task3 from "../components/Tasks/Task-3";
import "@testing-library/jest-dom";

const renderWithRouter = (component: React.ReactElement) => {
	return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe("Task3 Component Integration", () => {
	beforeEach(() => {
		jest.useFakeTimers();
	});

	afterEach(() => {
		jest.useRealTimers();
	});

	it("should render search input and city search functionality", () => {
		renderWithRouter(<Task3 />);

		expect(
			screen.getByPlaceholderText("Type city name..."),
		).toBeInTheDocument();
		expect(screen.getByText("Back to Task List")).toBeInTheDocument();
	});

	it("should show debounced search results after delay", async () => {
		renderWithRouter(<Task3 />);

		const searchInput = screen.getByPlaceholderText("Type city name...");

		// Type in search input
		fireEvent.change(searchInput, { target: { value: "lon" } });

		// Should not show results immediately
		expect(screen.queryByText("London")).not.toBeInTheDocument();

		// Fast forward time to trigger debounce
		act(() => {
			jest.advanceTimersByTime(500);
		});

		await waitFor(() => {
			expect(screen.getByText("London")).toBeInTheDocument();
		});
	});

	it("should reset timer when search term changes quickly", async () => {
		renderWithRouter(<Task3 />);

		const searchInput = screen.getByPlaceholderText("Type city name...");

		// Type first search
		fireEvent.change(searchInput, { target: { value: "par" } });

		// Advance time partially
		act(() => {
			jest.advanceTimersByTime(300);
		});

		// Change search before debounce completes
		fireEvent.change(searchInput, { target: { value: "lon" } });

		// Advance remaining time from first search
		act(() => {
			jest.advanceTimersByTime(200);
		});

		// Should not show results yet
		expect(screen.queryByText("London")).not.toBeInTheDocument();
		expect(screen.queryByText("Paris")).not.toBeInTheDocument();

		// Complete new debounce time
		act(() => {
			jest.advanceTimersByTime(300);
		});

		await waitFor(() => {
			expect(screen.getByText("London")).toBeInTheDocument();
		});
	});

	it("should display multiple matching cities", async () => {
		renderWithRouter(<Task3 />);

		const searchInput = screen.getByPlaceholderText("Type city name...");

		// Search for 'an' which should match several cities
		fireEvent.change(searchInput, { target: { value: "an" } });

		act(() => {
			jest.advanceTimersByTime(500);
		});

		await waitFor(() => {
			// Cities containing 'an'
			expect(screen.getByText("San Francisco")).toBeInTheDocument();
			expect(screen.getByText("Los Angeles")).toBeInTheDocument();
		});
	});

	it("should show no results for non-matching search", async () => {
		renderWithRouter(<Task3 />);

		const searchInput = screen.getByPlaceholderText("Type city name...");

		fireEvent.change(searchInput, { target: { value: "xyz123" } });

		act(() => {
			jest.advanceTimersByTime(500);
		});

		await waitFor(() => {
			const els = screen.getAllByText(
				(_, el) =>
					!!(el && el.textContent?.includes("No cities found matching")),
			);
			expect(els.length).toBeGreaterThan(0);
		});
	});

	it("should increment search count only after debounce", async () => {
		renderWithRouter(<Task3 />);

		const searchInput = screen.getByPlaceholderText("Type city name...");

		// Type multiple characters quickly
		fireEvent.change(searchInput, { target: { value: "l" } });
		fireEvent.change(searchInput, { target: { value: "lo" } });
		fireEvent.change(searchInput, { target: { value: "lon" } });

		// Should show 0 searches initially
		expect(screen.getByText("Search calls: 0")).toBeInTheDocument();

		act(() => {
			jest.advanceTimersByTime(500);
		});

		await waitFor(() => {
			// Should show 1 search after debounce
			expect(screen.getByText("Search calls: 1")).toBeInTheDocument();
		});
	});

	it("should handle empty search gracefully", async () => {
		renderWithRouter(<Task3 />);

		const searchInput = screen.getByPlaceholderText("Type city name...");

		// Start with some text
		fireEvent.change(searchInput, { target: { value: "london" } });
		act(() => {
			jest.advanceTimersByTime(500);
		});

		// Clear the search
		fireEvent.change(searchInput, { target: { value: "" } });
		act(() => {
			jest.advanceTimersByTime(500);
		});

		await waitFor(() => {
			// Should not show any cities or "no cities found"
			expect(screen.queryByText("London")).not.toBeInTheDocument();
			expect(screen.queryByText("No cities found")).not.toBeInTheDocument();
		});
	});

	it("should be case insensitive", async () => {
		renderWithRouter(<Task3 />);

		const searchInput = screen.getByPlaceholderText("Type city name...");

		fireEvent.change(searchInput, { target: { value: "LONDON" } });

		act(() => {
			jest.advanceTimersByTime(500);
		});

		await waitFor(() => {
			expect(screen.getByText("London")).toBeInTheDocument();
		});
	});

	it("should handle special characters in search", async () => {
		renderWithRouter(<Task3 />);

		const searchInput = screen.getByPlaceholderText("Type city name...");

		fireEvent.change(searchInput, { target: { value: "lon@#$" } });

		act(() => {
			jest.advanceTimersByTime(500);
		});

		await waitFor(() => {
			const els = screen.getAllByText(
				(_, el) =>
					!!(el && el.textContent?.includes("No cities found matching")),
			);
			expect(els.length).toBeGreaterThan(0);
		});
	});

	it("should navigate back to task list", () => {
		renderWithRouter(<Task3 />);

		const backButton = screen.getByText("Back to Task List");
		expect(backButton).toBeInTheDocument();
		expect(backButton.closest("a")).toHaveAttribute("href", "/");
	});
});
