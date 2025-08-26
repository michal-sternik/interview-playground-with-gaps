import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import { Task1, Task2, Task3, Task4 } from "./components/index";
import { TaskCard } from "./components/TaskCard";

export default function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<RootLayout />} />
				<Route path="/task-1" element={<Task1 />} />
				<Route path="/task-2" element={<Task2 />} />
				<Route path="/task-3" element={<Task3 />} />
				<Route path="/task-4" element={<Task4 />} />
				{/* other routes for future tasks can be added here */}
			</Routes>
		</Router>
	);
}

const RootLayout = () => {
	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
			<div className="max-w-4xl mx-auto">
				<div className="text-center mb-12">
					<h1 className="text-4xl font-bold text-gray-900 mb-4">
						Interview Tasks
					</h1>
				</div>

				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
					<TaskCard
						title="Task 1: useWeatherData"
						description="Implement a hook to fetch current weather data for a city"
						link="/task-1"
					/>

					<TaskCard
						title="Task 2: Conditional Rendering"
						description="Implement logic to display icons based on weather conditions"
						link="/task-2"
					/>

					<TaskCard
						title="Task 3: useDebounce"
						description="Create a useDebounce hook to delay search queries while typing"
						link="/task-3"
					/>

					<TaskCard
						title="Task 4: useLocalStorage"
						description="Create a useLocalStorage hook to change the language of the cloud description page"
						link="/task-4"
					/>

					<TaskCard
						title="Task 5: coming soon..."
						description="Implement logic to display a loading state while fetching weather data"
						link="/task-5"
					/>
				</div>
			</div>
		</div>
	);
};
