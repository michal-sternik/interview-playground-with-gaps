"use client";

import { ArrowLeft, Database, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// BACKEND TASK 1: Implement REST API with CRUD Operations
//
// GOAL: Create a complete REST API for task management with all CRUD operations
//
// REQUIREMENTS:
// 1. Implement the following API endpoints in the /api/backend-task-1 folder:
//
//    FILES TO MODIFY:
//    - /api/backend-task-1/route.ts (GET, POST)
//    - /api/backend-task-1/[id]/route.ts (PUT, DELETE)
//
//    Endpoint informations:
//    - GET /api/backend-task-1 - Get all tasks
//    - POST /api/backend-task-1 - Create a new task
//    - PUT /api/backend-task-1/[id] - Update a task by ID
//    - DELETE /api/backend-task-1/[id] - Delete a task by ID
//
// 2. Task data structure (TaskItem interface):
//    {
//      id: string,           // Unique identifier (use Date.now().toString())
//      title: string,        // Task title
//      description: string,  // Task description
//      completed: boolean,   // Task completion status
//      createdAt: string     // ISO date string
//    }
//
// 3. Use in-memory storage (array) to store tasks - no database required. Task variable defined in /api/backend-task-1/route.ts
//
// 4. API Response formats:
//    - GET /api/backend-task-1: { tasks: TaskItem[] }
//    - POST /api/backend-task-1: { task: TaskItem, message: string }, { status: 201 }
//    - PUT /api/backend-task-1/[id]: { task: TaskItem, message: string }
//    - DELETE /api/backend-task-1/[id]: { message: string }
//
// 5. Request validation:
//    - POST: title and description are required
//
//
// EXAMPLE USAGE:
// POST /api/backend-task-1
// Body: { "title": "Learn Next.js", "description": "Complete the tutorial" }
//
// PUT /api/backend-task-1/123
// Body: { "completed": true }

interface TaskItem {
	id: string;
	title: string;
	description: string;
	completed: boolean;
	createdAt: string;
}

export default function BackendTask1() {
	const [tasks, setTasks] = useState<TaskItem[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [newTask, setNewTask] = useState({ title: "", description: "" });

	const fetchTasks = async () => {
		setLoading(true);
		setError(null);
		try {
			const response = await fetch("/api/backend-task-1");
			if (!response.ok) throw new Error("Failed to fetch tasks");
			const data = await response.json();
			setTasks(data || []);
		} catch (err) {
			setError(err instanceof Error ? err.message : "Unknown error");
		} finally {
			setLoading(false);
		}
	};

	const createTask = async () => {
		if (!newTask.title.trim() || !newTask.description.trim()) {
			setError("Title and description are required");
			return;
		}

		try {
			const response = await fetch("/api/backend-task-1", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(newTask),
			});
			if (!response.ok) throw new Error("Failed to create task");
			setNewTask({ title: "", description: "" });
			fetchTasks();
		} catch (err) {
			setError(err instanceof Error ? err.message : "Unknown error");
		}
	};

	const toggleTask = async (id: string, completed: boolean) => {
		try {
			const response = await fetch(`/api/backend-task-1/${id}`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ completed }),
			});
			if (!response.ok) throw new Error("Failed to update task");
			fetchTasks();
		} catch (err) {
			setError(err instanceof Error ? err.message : "Unknown error");
		}
	};

	const deleteTask = async (id: string) => {
		try {
			const response = await fetch(`/api/backend-task-1/${id}`, {
				method: "DELETE",
			});
			if (!response.ok) throw new Error("Failed to delete task");
			fetchTasks();
		} catch (err) {
			setError(err instanceof Error ? err.message : "Unknown error");
		}
	};

	useEffect(() => {
		fetchTasks();
	}, []);

	return (
		<div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-6">
			<div className="max-w-4xl mx-auto">
				<div className="mb-6">
					<Link href="/">
						<Button variant="outline" className="mb-4 bg-transparent">
							<ArrowLeft className="h-4 w-4 mr-2" />
							Back to Task List
						</Button>
					</Link>
				</div>

				<Card className="mb-6">
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Database className="h-5 w-5" />
							Backend Task 1: REST API with CRUD Operations
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							<div>
								<Input
									placeholder="Task title"
									value={newTask.title}
									onChange={(e) =>
										setNewTask({ ...newTask, title: e.target.value })
									}
								/>
							</div>
							<div>
								<Textarea
									placeholder="Task description"
									value={newTask.description}
									onChange={(e) =>
										setNewTask({ ...newTask, description: e.target.value })
									}
								/>
							</div>
							<Button onClick={createTask} className="w-full">
								<Plus className="h-4 w-4 mr-2" />
								Create Task
							</Button>
						</div>
					</CardContent>
				</Card>

				{error && (
					<Card className="bg-red-50 border-red-200 mb-6">
						<CardContent className="pt-6">
							<p className="text-red-700">Error: {error}</p>
						</CardContent>
					</Card>
				)}

				{loading ? (
					<Card>
						<CardContent className="pt-6">
							<div className="flex items-center justify-center py-8">
								<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
								<span className="ml-2">Loading tasks...</span>
							</div>
						</CardContent>
					</Card>
				) : (
					<div className="space-y-4">
						{tasks.length === 0 ? (
							<Card>
								<CardContent className="pt-6">
									<p className="text-center text-gray-500">
										No tasks found. Create your first task!
									</p>
								</CardContent>
							</Card>
						) : (
							tasks.map((task) => (
								<Card key={task.id}>
									<CardContent className="pt-6">
										<div className="flex items-start justify-between">
											<div className="flex-1">
												<h3
													className={`font-semibold ${
														task.completed ? "line-through text-gray-500" : ""
													}`}
												>
													{task.title}
												</h3>
												<p
													className={`text-sm mt-1 ${
														task.completed
															? "line-through text-gray-400"
															: "text-gray-600"
													}`}
												>
													{task.description}
												</p>
												<p className="text-xs text-gray-400 mt-2">
													Created: {new Date(task.createdAt).toLocaleString()}
												</p>
											</div>
											<div className="flex gap-2 ml-4">
												<Button
													variant="outline"
													size="sm"
													onClick={() => toggleTask(task.id, !task.completed)}
												>
													{task.completed ? "Undo" : "Complete"}
												</Button>
												<Button
													variant="destructive"
													size="sm"
													onClick={() => deleteTask(task.id)}
												>
													<Trash2 className="h-4 w-4" />
												</Button>
											</div>
										</div>
									</CardContent>
								</Card>
							))
						)}
					</div>
				)}
			</div>
		</div>
	);
}
