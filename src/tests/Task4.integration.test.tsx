import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { act } from "react";
import { BrowserRouter } from "react-router-dom";
import Task4 from "../components/Tasks/Task-4";
import "@testing-library/jest-dom";

// Mock localStorage for component testing
const mockLocalStorage = {
	getItem: jest.fn(),
	setItem: jest.fn(),
	removeItem: jest.fn(),
	clear: jest.fn(),
};

Object.defineProperty(window, "localStorage", {
	value: mockLocalStorage,
	writable: true,
});

const renderWithRouter = (component: React.ReactElement) => {
	return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe("Task4 Component Integration", () => {
	beforeEach(() => {
		jest.clearAllMocks();
		mockLocalStorage.getItem.mockReturnValue(null);
		// biome-ignore lint/suspicious/noEmptyBlockStatements: <Never resolves>
		mockLocalStorage.setItem.mockImplementation(() => {}); // Dodaj tę linię
	});

	it("should render with default language (German)", () => {
		renderWithRouter(<Task4 />);

		expect(screen.getByText("Wolkenarten")).toBeInTheDocument();
		expect(screen.getByText("Cumulus")).toBeInTheDocument();
	});

	it("should switch to English when English button is clicked", async () => {
		renderWithRouter(<Task4 />);

		const englishButton = screen.getByText("English");
		act(() => {
			fireEvent.click(englishButton);
		});

		await waitFor(() => {
			expect(screen.getByText("Types of Clouds")).toBeInTheDocument();
		});

		expect(mockLocalStorage.setItem).toHaveBeenCalledWith("language", "en");
	});

	it("should switch to German when Deutsch button is clicked", async () => {
		mockLocalStorage.getItem.mockReturnValue("en");

		renderWithRouter(<Task4 />);

		const deutschButton = screen.getByText("Deutsch");
		act(() => {
			fireEvent.click(deutschButton);
		});

		await waitFor(() => {
			expect(screen.getByText("Wolkenarten")).toBeInTheDocument();
		});

		expect(mockLocalStorage.setItem).toHaveBeenCalledWith("language", "de");
	});

	it("should load saved language from localStorage", () => {
		mockLocalStorage.getItem.mockReturnValue("en");

		renderWithRouter(<Task4 />);

		expect(screen.getByText("Types of Clouds")).toBeInTheDocument();
		expect(mockLocalStorage.getItem).toHaveBeenCalledWith("language");
	});

	it("should highlight selected language button", () => {
		renderWithRouter(<Task4 />);

		const deutschButton = screen.getByText("Deutsch");
		const englishButton = screen.getByText("English");

		// Default should be German
		expect(deutschButton).toHaveClass("bg-primary");
		expect(englishButton).not.toHaveClass("bg-primary");
	});

	it("should navigate back to task list", () => {
		renderWithRouter(<Task4 />);

		const backButton = screen.getByText("Back to Task List");
		expect(backButton).toBeInTheDocument();
		expect(backButton.closest("a")).toHaveAttribute("href", "/");
	});

	it("should persist language selection across multiple changes", async () => {
		renderWithRouter(<Task4 />);

		// Switch to English
		act(() => {
			fireEvent.click(screen.getByText("English"));
		});
		await waitFor(() => {
			expect(screen.getByText("Types of Clouds")).toBeInTheDocument();
		});

		// Switch back to German
		act(() => {
			fireEvent.click(screen.getByText("Deutsch"));
		});
		await waitFor(() => {
			expect(screen.getByText("Wolkenarten")).toBeInTheDocument();
		});

		expect(mockLocalStorage.setItem).toHaveBeenCalledTimes(2);
		expect(mockLocalStorage.setItem).toHaveBeenNthCalledWith(
			1,
			"language",
			"en",
		);
		expect(mockLocalStorage.setItem).toHaveBeenNthCalledWith(
			2,
			"language",
			"de",
		);
	});
});
