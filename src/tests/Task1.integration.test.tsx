import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { act } from "react";
import { BrowserRouter } from "react-router-dom";
import Task1 from "../components/Tasks/Task-1";
import "@testing-library/jest-dom";

jest.mock("nanoid", () => ({
	nanoid: () => `${Date.now()}-${Math.random().toString(36).slice(2)}`,
}));

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

describe("Task1 Component Integration", () => {
	beforeEach(() => {
		jest.clearAllMocks();
		mockLocalStorage.getItem.mockReturnValue(null);
		// biome-ignore lint/suspicious/noEmptyBlockStatements: <never resolves>
		mockLocalStorage.setItem.mockImplementation(() => {});
	});

	it("should render with default language (German)", () => {
		renderWithRouter(<Task1 />);

		expect(screen.getByText("Wolkenarten")).toBeInTheDocument();
		expect(screen.getByText("Cumulus")).toBeInTheDocument();
	});

	it("should switch to English when English button is clicked", async () => {
		renderWithRouter(<Task1 />);

		const englishButton = screen.getByText("English");
		act(() => {
			fireEvent.click(englishButton);
		});

		await waitFor(() => {
			expect(screen.getByText("Types of Clouds")).toBeInTheDocument();
		});

		expect(mockLocalStorage.setItem).toHaveBeenCalledWith("language", '"en"');
	});

	it("should switch to German when Deutsch button is clicked", async () => {
		mockLocalStorage.getItem.mockReturnValue('"en"');

		renderWithRouter(<Task1 />);

		const deutschButton = screen.getByText("Deutsch");
		act(() => {
			fireEvent.click(deutschButton);
		});

		await waitFor(() => {
			expect(screen.getByText("Wolkenarten")).toBeInTheDocument();
		});

		expect(mockLocalStorage.setItem).toHaveBeenCalledWith("language", '"de"');
	});

	it("should load saved language from localStorage", () => {
		mockLocalStorage.getItem.mockReturnValue('"en"');

		renderWithRouter(<Task1 />);

		expect(screen.getByText("Types of Clouds")).toBeInTheDocument();
		expect(mockLocalStorage.getItem).toHaveBeenCalledWith("language");
	});

	it("should handle reset button correctly", async () => {
		mockLocalStorage.getItem.mockReturnValue('"en"');

		renderWithRouter(<Task1 />);

		const resetButton = screen.getByText("Reset - Clear localStorage");
		act(() => {
			fireEvent.click(resetButton);
		});

		await waitFor(() => {
			expect(screen.getByText("Wolkenarten")).toBeInTheDocument();
		});

		expect(mockLocalStorage.removeItem).toHaveBeenCalledWith("language");
	});

	it("should display all cloud types in German", () => {
		renderWithRouter(<Task1 />);

		expect(screen.getByText("Cumulus")).toBeInTheDocument();
		expect(screen.getByText("Stratus")).toBeInTheDocument();
		expect(screen.getByText("Cirrus")).toBeInTheDocument();
		expect(screen.getByText("Nimbus")).toBeInTheDocument();

		expect(screen.getByText(/Weiße, flauschige Wolken/)).toBeInTheDocument();
		expect(screen.getByText(/Graue, geschichtete Wolken/)).toBeInTheDocument();
	});

	it("should display all cloud types in English", async () => {
		mockLocalStorage.getItem.mockReturnValue('"en"');

		renderWithRouter(<Task1 />);

		expect(screen.getByText(/White, fluffy clouds/)).toBeInTheDocument();
		expect(screen.getByText(/Gray, layered clouds/)).toBeInTheDocument();
	});

	it("should handle corrupted localStorage gracefully", () => {
		mockLocalStorage.getItem.mockReturnValue("invalid-json");
		const consoleSpy = jest.spyOn(console, "error").mockImplementation();

		renderWithRouter(<Task1 />);

		// Should fall back to default (German)
		expect(screen.getByText("Wolkenarten")).toBeInTheDocument();

		consoleSpy.mockRestore();
	});

	it("should highlight selected language button", () => {
		renderWithRouter(<Task1 />);

		const deutschButton = screen.getByText("Deutsch");
		const englishButton = screen.getByText("English");

		// Default should be German
		expect(deutschButton).toHaveClass("bg-primary");
		expect(englishButton).not.toHaveClass("bg-primary");
	});

	it("should navigate back to task list", () => {
		renderWithRouter(<Task1 />);

		const backButton = screen.getByText("Back to Task List");
		expect(backButton).toBeInTheDocument();
		expect(backButton.closest("a")).toHaveAttribute("href", "/");
	});

	it("should handle localStorage setItem errors gracefully", async () => {
		mockLocalStorage.setItem.mockImplementation(() => {
			throw new Error("Storage quota exceeded");
		});
		const consoleSpy = jest.spyOn(console, "error").mockImplementation();

		renderWithRouter(<Task1 />);

		const englishButton = screen.getByText("English");
		act(() => {
			fireEvent.click(englishButton);
		});

		// Should still update the UI even if localStorage fails
		await waitFor(() => {
			expect(screen.getByText("Types of Clouds")).toBeInTheDocument();
		});

		expect(consoleSpy).toHaveBeenCalled();
		consoleSpy.mockRestore();
	});

	it("should persist language selection across multiple changes", async () => {
		renderWithRouter(<Task1 />);

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
			'"en"',
		);
		expect(mockLocalStorage.setItem).toHaveBeenNthCalledWith(
			2,
			"language",
			'"de"',
		);
	});
});
