import { ArrowLeft, Droplets, Eye, Thermometer, Wind } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

// TASK 2: Implement custom hook useWeatherData
//
// GOAL: Create a hook that fetches weather data from the OpenWeather API
//
// REQUIREMENTS:
// 1. The hook should return a weather object for London city (UseWeatherDataReturn interface).
// 2. Should be parameterized by city name (string).
// 3. Should return an object with: { data, loading, error }
//    - data: WeatherData | null - the weather data or null if no data
//    - loading: boolean - true while fetching data
//    - error: string | null - error message or null if no error
// 4. Should handle loading and error states properly
// 5. Use the API endpoint: https://api.openweathermap.org/data/2.5/weather?q={city}&appid=0031d758ba088e9167c5079fc6515b39&units=metric&lang=en
// 6. UI is ready to display data.
//
// USAGE:
//   const city = "London";
//   const { data, loading, error } = useWeatherData(city);
//
// API RESPONSE STRUCTURE (WeatherData interface):
// {
//   "name": "London",                    // City name
//   "main": {
//     "temp": 15.5,                     // Temperature in Celsius
//     "feels_like": 14.2,               // Feels like temperature
//     "humidity": 72,                   // Humidity percentage
//     "pressure": 1013                  // Pressure in hPa
//   },
//   "weather": [
//     {
//       "main": "Clouds",               // Weather condition
//       "description": "broken clouds", // Weather description
//       "icon": "04d"                   // Icon code for weather icon
//     }
//   ],
//   "wind": {
//     "speed": 3.6                      // Wind speed in m/s
//   },
//   "visibility": 10000                 // Visibility in m	name: string;

export interface WeatherData {
	name: string;
	main: {
		temp: number;
		feels_like: number;
		humidity: number;
		pressure: number;
	};
	weather: Array<{
		main: string;
		description: string;
		icon: string;
	}>;
	wind: {
		speed: number;
	};
	visibility: number;
}

export interface UseWeatherDataReturn {
	data: WeatherData | null;
	loading: boolean;
	error: string | null;
}

// TODO: Implement the useWeatherData hook below
export function useWeatherData(city: string): UseWeatherDataReturn {
	//delete
	return { data: null, loading: false, error: null };
}

export default function Task2() {
	const city = "London";
	const { data, loading, error } = useWeatherData(city);

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
			<div className="max-w-4xl mx-auto">
				<div className="mb-6">
					<Link to="/">
						<Button variant="outline" className="mb-4 bg-transparent">
							<ArrowLeft className="h-4 w-4 mr-2" />
							Back to Task List
						</Button>
					</Link>
				</div>

				{loading && (
					<Card>
						<CardContent className="pt-6">
							<div className="flex items-center justify-center py-8">
								<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
								<span className="ml-2">Loading weather data...</span>
							</div>
						</CardContent>
					</Card>
				)}

				{error && (
					<Card className="bg-red-50 border-red-200">
						<CardContent className="pt-6">
							<p className="text-red-700">Error: {error}</p>
						</CardContent>
					</Card>
				)}

				{data && !loading && (
					<Card>
						<CardHeader>
							<CardTitle className="text-2xl flex items-center gap-2">
								{data.name}
								<img
									src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
									alt={data.weather[0].description}
									className="w-12 h-12"
								/>
							</CardTitle>
							<p className="text-lg text-gray-600 capitalize">
								{data.weather[0].description}
							</p>
						</CardHeader>
						<CardContent>
							<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
								<Card className="bg-blue-50">
									<CardContent className="pt-4">
										<div className="flex items-center gap-2">
											<Thermometer className="h-5 w-5 text-blue-500" />
											<div>
												<p className="text-sm text-gray-600">Temperature</p>
												<p className="text-xl font-bold">{data.main.temp}°C</p>
												<p className="text-xs text-gray-500">
													Feels like: {data.main.feels_like}°C
												</p>
											</div>
										</div>
									</CardContent>
								</Card>

								<Card className="bg-green-50">
									<CardContent className="pt-4">
										<div className="flex items-center gap-2">
											<Droplets className="h-5 w-5 text-green-500" />
											<div>
												<p className="text-sm text-gray-600">Humidity</p>
												<p className="text-xl font-bold">
													{data.main.humidity}%
												</p>
												<p className="text-sm text-gray-600">Pressure: </p>
												<p className="text-xs text-gray-500">
													{data.main.pressure} hPa
												</p>
											</div>
										</div>
									</CardContent>
								</Card>

								<Card className="bg-purple-50">
									<CardContent className="pt-4">
										<div className="flex items-center gap-2">
											<Wind className="h-5 w-5 text-purple-500" />
											<div>
												<p className="text-sm text-gray-600">Wind</p>
												<p className="text-xl font-bold">
													{data.wind.speed} m/s
												</p>
												<p className="text-xs text-gray-500">
													{(data.wind.speed * 3.6).toFixed(1)} km/h
												</p>
											</div>
										</div>
									</CardContent>
								</Card>

								<Card className="bg-orange-50">
									<CardContent className="pt-4">
										<div className="flex items-center gap-2">
											<Eye className="h-5 w-5 text-orange-500" />
											<div>
												<p className="text-sm text-gray-600">Visibility</p>
												<p className="text-xl font-bold">
													{(data.visibility / 1000).toFixed(1)} km
												</p>
											</div>
										</div>
									</CardContent>
								</Card>
							</div>
						</CardContent>
					</Card>
				)}
			</div>
		</div>
	);
}
