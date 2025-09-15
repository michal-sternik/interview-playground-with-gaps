import { ArrowLeft, BadgeQuestionMark } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

// TASK 2: Implement WeatherIcon component with conditional rendering
//
// GOAL: Create a component that displays the appropriate icon based on weather conditions
//
// REQUIREMENTS:
// 1. The component should accept a 'condition' prop (string)
// 2. Based on the condition value, it should render the appropriate icon from lucide-react
// 3. Use conditional rendering (object mapping)
// 4. Add appropriate colors for each icon using Tailwind CSS classes
// 5. Handle unknown conditions with a default icon
//
// CONDITIONS TO HANDLE:
// - "sunny" or "clear" → Sun icon (yellow-500)
// - "cloudy" or "partly cloudy" → Cloud icon (slate-500)
// - "rainy" or "rain" → CloudRain icon (blue-500)
// - "snowy" or "snow" → CloudSnow icon (blue-300)
// - "stormy" or "thunderstorm" → Zap icon (purple-500)
// - "foggy" or "mist" → Eye icon (slate-500)
// - "windy" → Wind icon (green-500)
// - default → Sun icon (yellow-500)
//
// COMPONENT INTERFACE:
// interface WeatherIconProps {
//   condition: string    // Weather condition (e.g., "sunny", "rainy")
// }

export interface WeatherIconProps {
	condition: string;
}

// TODO: Implement the WeatherIcon component below
export function WeatherIcon({ condition }: WeatherIconProps) {
	//delete
	return <BadgeQuestionMark />;
}

// Sample weather data for different cities

export default function Task2() {
	const [selectedCondition, setSelectedCondition] = useState("sunny");

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

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
			<div className="max-w-4xl mx-auto">
				<div className="mb-6">
					<Link to="/">
						<Button variant="outline" className="mb-4 bg-transparent">
							<ArrowLeft className="size-4 mr-2" />
							Back to Task List
						</Button>
					</Link>
				</div>

				{/* Interactive test */}
				<Card className="mb-6">
					<CardHeader>
						<CardTitle>Interactive Test</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							<p className="text-slate-500">
								Select weather conditions to test the component:
							</p>
							<div className="flex flex-wrap gap-2">
								{conditions.map((condition) => (
									<Button
										key={condition}
										onClick={() => setSelectedCondition(condition)}
										variant={
											selectedCondition === condition ? "default" : "outline"
										}
										size="sm"
										className="capitalize"
									>
										{condition}
									</Button>
								))}
							</div>

							<Card className="bg-white/50 max-w-sm">
								<CardContent className="pt-6">
									<div className="flex items-center gap-4">
										<WeatherIcon condition={selectedCondition} />
										<div>
											<p className="font-semibold capitalize">
												{selectedCondition}
											</p>
											<p className="text-sm text-slate-500">
												Test weather icon
											</p>
										</div>
									</div>
								</CardContent>
							</Card>
						</div>
					</CardContent>
				</Card>

				{/* Sample weather data */}
				<Card>
					<CardHeader>
						<CardTitle>Weather in Europe</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
							{weatherData.map((weather, index) => (
								<Card
									key={index}
									className="bg-white/50 hover:bg-white/80 transition-colors"
								>
									<CardContent className="pt-4">
										<div className="flex items-center justify-between mb-2">
											<h3 className="font-semibold">{weather.city}</h3>
											<WeatherIcon condition={weather.condition} />
										</div>
										<div className="space-y-1">
											<p className="text-2xl font-bold">
												{weather.temperature}°C
											</p>
											<p className="text-sm text-slate-500">
												{weather.description}
											</p>
											<p className="text-xs text-slate-500 capitalize">
												Condition: {weather.condition}
											</p>
										</div>
									</CardContent>
								</Card>
							))}
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
const weatherData = [
	{ city: "London", condition: "sunny", temperature: 22, description: "Sunny" },
	{
		city: "Paris",
		condition: "cloudy",
		temperature: 18,
		description: "Cloudy",
	},
	{ city: "Berlin", condition: "rainy", temperature: 15, description: "Rainy" },
	{ city: "Moscow", condition: "snowy", temperature: -2, description: "Snowy" },
	{ city: "Rome", condition: "stormy", temperature: 16, description: "Stormy" },
	{
		city: "Amsterdam",
		condition: "foggy",
		temperature: 12,
		description: "Foggy",
	},
	{ city: "Madrid", condition: "windy", temperature: 19, description: "Windy" },
	{
		city: "Vienna",
		condition: "partly cloudy",
		temperature: 20,
		description: "Partly Cloudy",
	},
];
