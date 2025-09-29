"use client";

import { ArrowLeft, Database, FileEdit, RefreshCw } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

// BACKEND TASK 4: Simple JSON File Updates
//
// GOAL: Create a basic JSON file update system
//
// REQUIREMENTS:
// 1. Implement the following API endpoints:
//    - POST /api/backend-task-4 - Update JSON file with simple key-value pairs
//    - GET /api/backend-task-4 - Get current JSON file contents
//
// 2. JSON file structure (simple flat object):
//    {
//      "name": "John",
//    }
//
// 3. Implementation steps:
//    - File already exists at api/backend-task-4/data.json
//    - Use fs.readFile(filePath, "utf8") to read file
//    - Use JSON.parse() to convert string to object
//    - Update: data[key] = value
//    - Use fs.writeFile(filePath, JSON.stringify(data, null, 2)) to save
//
// FILES TO MODIFY:
// - /api/backend-task-4/route.ts (GET, POST)
//
// EXAMPLE USAGE:
// POST /api/backend-task-4
// Body: { "key": "name", "value": "Jane Doe" }

interface JsonData {
	[key: string]: string;
}

export default function BackendTask4() {
	const [jsonData, setJsonData] = useState<JsonData | null>(null);
	const [updateKey, setUpdateKey] = useState("");
	const [updateValue, setUpdateValue] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const fetchJsonData = async () => {
		setLoading(true);
		setError(null);
		try {
			const response = await fetch("/api/backend-task-4");
			if (response.ok) {
				const data = await response.json();
				setJsonData(data.data);
			} else if (response.status === 404) {
				setJsonData({});
			} else {
				throw new Error("Failed to fetch JSON data");
			}
		} catch (err) {
			setError(err instanceof Error ? err.message : "Unknown error");
		} finally {
			setLoading(false);
		}
	};

	const updateJsonFile = async () => {
		if (!updateKey.trim()) {
			setError("Key is required");
			return;
		}

		setError(null);
		try {
			const response = await fetch("/api/backend-task-4", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					key: updateKey,
					value: updateValue,
				}),
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.message || "Failed to update JSON");
			}

			setUpdateKey("");
			setUpdateValue("");
			fetchJsonData();
		} catch (err) {
			setError(err instanceof Error ? err.message : "Unknown error");
		}
	};

	const presetUpdates = [
		{ key: "name", value: "John Doe", label: "Update user name" },
		{ key: "email", value: "john.doe@example.com", label: "Update email" },
		{ key: "theme", value: "dark", label: "Set theme to dark" },
		{ key: "language", value: "en", label: "Set language to English" },
		{ key: "version", value: "2.0.0", label: "Update version" },
		{ key: "status", value: "active", label: "Set status to active" },
	];

	const applyPresetUpdate = (key: string, value: string) => {
		setUpdateKey(key);
		setUpdateValue(value);
	};

	useEffect(() => {
		fetchJsonData();
	}, []);

	return (
		<div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100 p-6">
			<div className="max-w-6xl mx-auto">
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
							<FileEdit className="h-5 w-5" />
							Backend Task 4: Simple JSON File Updates
						</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-sm text-gray-600">
							Simple key-value JSON file updates - perfect for beginners
						</p>
					</CardContent>
				</Card>

				{error && (
					<Card className="bg-red-50 border-red-200 mb-6">
						<CardContent className="pt-6">
							<p className="text-red-700">Error: {error}</p>
						</CardContent>
					</Card>
				)}

				<div className="grid lg:grid-cols-2 gap-6">
					{/* Update Interface */}
					<div>
						<Card className="mb-6">
							<CardHeader>
								<CardTitle>Update JSON File</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									<div>
										<label className="text-sm font-medium">
											Key (simple key names only)
										</label>
										<Input
											placeholder="e.g., name, theme, version"
											value={updateKey}
											onChange={(e) => setUpdateKey(e.target.value)}
										/>
									</div>
									<div>
										<label className="text-sm font-medium">Value</label>
										<Input
											placeholder="New value"
											value={updateValue}
											onChange={(e) => setUpdateValue(e.target.value)}
										/>
									</div>
									<Button onClick={updateJsonFile} className="w-full">
										Update JSON File
									</Button>
								</div>
							</CardContent>
						</Card>

						{/* Preset Updates */}
						<Card>
							<CardHeader>
								<CardTitle>Quick Updates</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="space-y-2">
									{presetUpdates.map((preset, index) => (
										<Button
											key={index}
											variant="outline"
											size="sm"
											onClick={() =>
												applyPresetUpdate(preset.key, preset.value)
											}
											className="w-full justify-start text-left"
										>
											<span className="font-mono text-xs mr-2">
												{preset.key}
											</span>
											{preset.label}
										</Button>
									))}
								</div>
							</CardContent>
						</Card>
					</div>

					{/* JSON Display */}
					<div>
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center justify-between">
									<span className="flex items-center gap-2">
										<Database className="h-5 w-5" />
										Current JSON Data
									</span>
									<Button
										variant="outline"
										size="sm"
										onClick={fetchJsonData}
										disabled={loading}
									>
										<RefreshCw
											className={`h-4 w-4 ${loading ? "animate-spin" : ""}`}
										/>
									</Button>
								</CardTitle>
							</CardHeader>
							<CardContent>
								{loading ? (
									<div className="flex items-center justify-center py-8">
										<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
										<span className="ml-2">Loading...</span>
									</div>
								) : jsonData ? (
									<pre className="bg-gray-100 p-4 rounded-md text-sm overflow-auto max-h-96">
										{JSON.stringify(jsonData, null, 2)}
									</pre>
								) : (
									<p className="text-center text-gray-500 py-8">
										No JSON data found. Create some updates to see the file
										contents.
									</p>
								)}
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</div>
	);
}
