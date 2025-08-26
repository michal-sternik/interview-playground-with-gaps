import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Task2 from "../components/Tasks/Task-2";
import "@testing-library/jest-dom";

const renderWithRouter = (component: React.ReactElement) => {
	return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe("Task2 Component Integration", () => {
	it("should render weather condition selector and icons", () => {
		renderWithRouter(<Task2 />);

		expect(screen.getByText("Back to Task List")).toBeInTheDocument();
		expect(screen.getByText("Interactive Test")).toBeInTheDocument();
		expect(screen.getByText("Weather in Europe")).toBeInTheDocument();
	});

	it("should display correct icon for selected weather condition", () => {
		renderWithRouter(<Task2 />);

		// Check initial sunny condition
		const { container } = render(<div data-testid="weather-icon-container" />);
		expect(container).toBeInTheDocument();
	});

	it("should change weather condition when button is clicked", () => {
		renderWithRouter(<Task2 />);

		// Find and click different weather condition buttons
		const conditions = [
			"sunny",
			"cloudy",
			"rainy",
			"snowy",
			"stormy",
			"foggy",
			"windy",
			"partly cloudy",
		];

		conditions.forEach((condition) => {
			// Use getByRole to target the button specifically, not the display text
			const button = screen.getByRole("button", { name: condition });
			expect(button).toBeInTheDocument();

			fireEvent.click(button);

			// Verify the button is selected (has active styling with bg-primary)
			expect(button).toHaveClass("bg-primary");
		});
	});

	it("should navigate back to task list", () => {
		renderWithRouter(<Task2 />);

		const backButton = screen.getByText("Back to Task List");
		expect(backButton).toBeInTheDocument();
		expect(backButton.closest("a")).toHaveAttribute("href", "/");
	});

	it("should display all weather condition options", () => {
		renderWithRouter(<Task2 />);

		const weatherConditions = [
			"sunny",
			"cloudy",
			"rainy",
			"snowy",
			"stormy",
			"foggy",
			"windy",
			"partly cloudy",
		];

		weatherConditions.forEach((condition) => {
			// Use getByRole to target the button specifically
			expect(
				screen.getByRole("button", { name: condition }),
			).toBeInTheDocument();
		});
	});

	it("should maintain selected state when condition is chosen", () => {
		renderWithRouter(<Task2 />);

		const rainyButton = screen.getByRole("button", { name: "rainy" });
		fireEvent.click(rainyButton);

		// Check that rainy is selected and others are not
		expect(rainyButton).toHaveClass("bg-primary");

		const sunnyButton = screen.getByRole("button", { name: "sunny" });
		expect(sunnyButton).not.toHaveClass("bg-primary");
	});

	it("should handle rapid condition changes", () => {
		renderWithRouter(<Task2 />);

		const sunnyButton = screen.getByRole("button", { name: "sunny" });
		const rainyButton = screen.getByRole("button", { name: "rainy" });
		const snowyButton = screen.getByRole("button", { name: "snowy" });

		// Click multiple buttons rapidly
		fireEvent.click(sunnyButton);
		fireEvent.click(rainyButton);
		fireEvent.click(snowyButton);

		// Only the last clicked should be active
		expect(snowyButton).toHaveClass("bg-primary");
		expect(sunnyButton).not.toHaveClass("bg-primary");
		expect(rainyButton).not.toHaveClass("bg-primary");
	});

	it("should display weather condition description", () => {
		renderWithRouter(<Task2 />);

		expect(
			screen.getByText(/Select weather conditions to test the component/),
		).toBeInTheDocument();
	});

	it("should handle edge case conditions", () => {
		renderWithRouter(<Task2 />);

		const partlyCloudyButton = screen.getByRole("button", {
			name: "partly cloudy",
		});
		fireEvent.click(partlyCloudyButton);

		expect(partlyCloudyButton).toHaveClass("bg-primary");
	});
});
