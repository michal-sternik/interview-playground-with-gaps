import { TaskCard } from "@/components/TaskCard";

export default function HomePage() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
			<div className="max-w-6xl mx-auto">
				<div className="text-center mb-12">
					<h1 className="text-4xl font-bold text-gray-900 mb-4">
						Interview Tasks
					</h1>
				</div>

				<div className="mb-8">
					<h2 className="text-2xl font-semibold text-gray-800 mb-4">
						Frontend Tasks
					</h2>
					<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
						<TaskCard
							title="Task 1: useWeatherData"
							description="Implement a hook to fetch current weather data for a city"
							link="/frontend/task-1"
						/>
						<TaskCard
							title="Task 2: Conditional Rendering"
							description="Implement logic to display icons based on weather conditions"
							link="/frontend/task-2"
						/>
						<TaskCard
							title="Task 3: useDebounce"
							description="Create a useDebounce hook to delay search queries while typing"
							link="/frontend/task-3"
						/>
						<TaskCard
							title="Task 4: useLocalStorage"
							description="Create a useLocalStorage hook to change the language of the cloud description page"
							link="/frontend/task-4"
						/>
					</div>
				</div>

				<div>
					<h2 className="text-2xl font-semibold text-gray-800 mb-4">
						Backend Tasks
					</h2>
					<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
						<TaskCard
							title="Backend Task 1: REST API"
							description="Implement CRUD operations for tasks management"
							link="/backend/task-1"
						/>
						<TaskCard
							title="Backend Task 2: Authentication"
							description="Authenticate users with simple token-based login"
							link="/backend/task-2"
						/>
						<TaskCard
							title="Backend Task 3: Request Log 'Middleware'"
							description="Custom server with status endpoints and ability to log request history"
							link="/backend/task-3"
						/>
						<TaskCard
							title="Backend Task 4: JSON Updates"
							description="Functions to update JSON files dynamically"
							link="/backend/task-4"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
