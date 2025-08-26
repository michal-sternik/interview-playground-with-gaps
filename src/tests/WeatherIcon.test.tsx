import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { WeatherIcon } from "../components/Tasks/Task-4";

describe("WeatherIcon Component", () => {
	it("should render Sun icon for sunny condition", () => {
		const { container } = render(<WeatherIcon condition="sunny" />);
		const sunIcon = container.querySelector("svg");

		expect(sunIcon).toBeInTheDocument();
		expect(sunIcon).toHaveClass("text-yellow-500");
	});

	it("should render Sun icon for clear condition", () => {
		const { container } = render(<WeatherIcon condition="clear" />);
		const sunIcon = container.querySelector("svg");

		expect(sunIcon).toBeInTheDocument();
		expect(sunIcon).toHaveClass("text-yellow-500");
	});

	it("should render Cloud icon for cloudy condition", () => {
		const { container } = render(<WeatherIcon condition="cloudy" />);
		const cloudIcon = container.querySelector("svg");

		expect(cloudIcon).toBeInTheDocument();
		expect(cloudIcon).toHaveClass("text-slate-500");
	});

	it("should render Cloud icon for partly cloudy condition", () => {
		const { container } = render(<WeatherIcon condition="partly cloudy" />);
		const cloudIcon = container.querySelector("svg");

		expect(cloudIcon).toBeInTheDocument();
		expect(cloudIcon).toHaveClass("text-slate-500");
	});

	it("should render CloudRain icon for rainy condition", () => {
		const { container } = render(<WeatherIcon condition="rainy" />);
		const rainIcon = container.querySelector("svg");

		expect(rainIcon).toBeInTheDocument();
		expect(rainIcon).toHaveClass("text-blue-500");
	});

	it("should render CloudSnow icon for snowy condition", () => {
		const { container } = render(<WeatherIcon condition="snowy" />);
		const snowIcon = container.querySelector("svg");

		expect(snowIcon).toBeInTheDocument();
		expect(snowIcon).toHaveClass("text-blue-300");
	});

	it("should render Zap icon for stormy condition", () => {
		const { container } = render(<WeatherIcon condition="stormy" />);
		const zapIcon = container.querySelector("svg");

		expect(zapIcon).toBeInTheDocument();
		expect(zapIcon).toHaveClass("text-purple-500");
	});

	it("should render Eye icon for foggy condition", () => {
		const { container } = render(<WeatherIcon condition="foggy" />);
		const eyeIcon = container.querySelector("svg");

		expect(eyeIcon).toBeInTheDocument();
		expect(eyeIcon).toHaveClass("text-slate-500");
	});

	it("should render Wind icon for windy condition", () => {
		const { container } = render(<WeatherIcon condition="windy" />);
		const windIcon = container.querySelector("svg");

		expect(windIcon).toBeInTheDocument();
		expect(windIcon).toHaveClass("text-green-500");
	});

	it("should render default Sun icon for unknown condition", () => {
		const { container } = render(<WeatherIcon condition="unknown-weather" />);
		const defaultIcon = container.querySelector("svg");

		expect(defaultIcon).toBeInTheDocument();
		expect(defaultIcon).toHaveClass("text-yellow-500");
	});

	it("should handle empty string condition", () => {
		const { container } = render(<WeatherIcon condition="" />);
		const defaultIcon = container.querySelector("svg");

		expect(defaultIcon).toBeInTheDocument();
		expect(defaultIcon).toHaveClass("text-yellow-500");
	});

	it("should handle case sensitivity", () => {
		const { container: upperContainer } = render(
			<WeatherIcon condition="SUNNY" />,
		);
		const { container: lowerContainer } = render(
			<WeatherIcon condition="sunny" />,
		);

		const upperIcon = upperContainer.querySelector("svg");
		const lowerIcon = lowerContainer.querySelector("svg");

		// SUNNY should fall back to default (yellow-500), sunny should be yellow
		expect(upperIcon).toHaveClass("text-yellow-500");
		expect(lowerIcon).toHaveClass("text-yellow-500");
	});

	it("should handle special characters in condition", () => {
		const { container } = render(<WeatherIcon condition="sun@#$%ny" />);
		const defaultIcon = container.querySelector("svg");

		expect(defaultIcon).toBeInTheDocument();
		expect(defaultIcon).toHaveClass("text-yellow-500");
	});

	it("should handle null-like strings", () => {
		const { container: nullContainer } = render(
			<WeatherIcon condition="null" />,
		);
		const { container: undefinedContainer } = render(
			<WeatherIcon condition="undefined" />,
		);

		const nullIcon = nullContainer.querySelector("svg");
		const undefinedIcon = undefinedContainer.querySelector("svg");

		expect(nullIcon).toHaveClass("text-yellow-500");
		expect(undefinedIcon).toHaveClass("text-yellow-500");
	});

	it("should handle whitespace in condition", () => {
		const { container: spaceContainer } = render(
			<WeatherIcon condition=" rainy " />,
		);
		const { container: tabContainer } = render(
			<WeatherIcon condition="\trainy\t" />,
		);

		const spaceIcon = spaceContainer.querySelector("svg");
		const tabIcon = tabContainer.querySelector("svg");

		// These should not match "sunny" exactly and fall back to default (yellow-500)
		expect(spaceIcon).toHaveClass("text-yellow-500");
		expect(tabIcon).toHaveClass("text-yellow-500");
	});

	it("should handle very long condition strings", () => {
		const longCondition = "a".repeat(1000);
		const { container } = render(<WeatherIcon condition={longCondition} />);
		const defaultIcon = container.querySelector("svg");

		expect(defaultIcon).toBeInTheDocument();
		expect(defaultIcon).toHaveClass("text-yellow-500");
	});

	it("should maintain consistent DOM structure across different conditions", () => {
		const conditions = ["sunny", "cloudy", "rainy", "unknown"];

		conditions.forEach((condition) => {
			const { container } = render(<WeatherIcon condition={condition} />);
			const icon = container.querySelector("svg");

			expect(icon).toBeInTheDocument();
		});
	});
});
