"use client";

import { ArrowLeft } from "lucide-react";
import { nanoid } from "nanoid";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// TASK 4: Implement custom hook useLocalStorage
//
// GOAL: Create a hook that allows storing and reading data from localStorage
// The hook should return an array with the current value and a function to update it (similar to useState)
//
// REQUIREMENTS:
// 1. The hook should accept a key (string) and defaultValue (language: "en" | "de")
// 2. Should return [value, setValue] where:
//    - value: "en" | "de" - current value from localStorage or defaultValue
//    - setValue: (value: "en" | "de") => void - function to update the value
// 3. The value should be automatically saved to localStorage whenever it changes
// 4. On first load, it should read the value from localStorage or use the default value
// 5. Handle edge cases
// 6. Handle JSON parsing errors
// 7. Comment "const [language, setLanguage] = (() => ["de", () => {}])();"
// 8. Uncomment "const [language, setLanguage] = useLocalStorage("language", "de");"
//
// EXAMPLE USAGE:
// const [language, setLanguage] = useLocalStorage("language", "de");
// setLanguage('en') // This should save 'en' to localStorage under key 'language'

// TODO: Implement the useLocalStorage hook below
type Language = "en" | "de";
export function useLocalStorage(key: string, defaultValue: Language) {
	//code here
}

export default function Task4() {
	// Using the useLocalStorage hook to store the selected language
	// uncomment
	// const [language, setLanguage] = useLocalStorage("language", "de");

	// comment after useLocalStorage hook is finished
	// biome-ignore lint/suspicious/noEmptyBlockStatements: <only for placeholder purposes>
	const [language, setLanguage] = (() => ["de", (_: "en" | "de") => {}])();

	const currentData = cloudData[language as Language];

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
			<div className="max-w-4xl mx-auto">
				<div className="mb-6">
					<Link href="/">
						<Button variant="outline" className="mb-4 bg-transparent">
							<ArrowLeft className="h-4 w-4 mr-2" />
							Back to Task List
						</Button>
					</Link>

					<Card className="mb-6">
						<CardContent>
							<div className="flex gap-2 items-center">
								<Button
									onClick={() => setLanguage("en")}
									variant={language === "en" ? "default" : "outline"}
									size="sm"
									className="cursor-pointer"
								>
									English
								</Button>
								<Button
									onClick={() => setLanguage("de")}
									variant={language === "de" ? "default" : "outline"}
									size="sm"
									className="cursor-pointer"
								>
									Deutsch
								</Button>
								<Button
									variant="outline"
									size="sm"
									className="ml-auto bg-transparent"
									onClick={() => {
										if (typeof window !== "undefined") {
											localStorage.removeItem("language");
										}
										setLanguage("de");
									}}
								>
									Reset - Clear localStorage
								</Button>
							</div>
						</CardContent>
					</Card>
				</div>

				<Card>
					<CardHeader>
						<CardTitle className="text-2xl">{currentData.title}</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="grid md:grid-cols-2 gap-4">
							{currentData.clouds.map((cloud) => {
								const id = nanoid();
								return (
									<Card key={id} className="bg-white/50">
										<CardHeader>
											<CardTitle className="text-lg">{cloud.name}</CardTitle>
										</CardHeader>
										<CardContent>
											<p className="text-gray-600">{cloud.description}</p>
										</CardContent>
									</Card>
								);
							})}
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}

// Cloud data in different languages (German text for translation task)
const cloudData = {
	en: {
		title: "Types of Clouds",
		clouds: [
			{
				name: "Cumulus",
				description:
					"White, fluffy clouds with distinct shapes. Usually indicate good weather.",
			},
			{
				name: "Stratus",
				description:
					"Gray, layered clouds covering the entire sky. May bring drizzle.",
			},
			{
				name: "Cirrus",
				description:
					"High, thin clouds resembling feathers. Made of ice crystals.",
			},
			{
				name: "Nimbus",
				description: "Dark rain clouds. Bring atmospheric precipitation.",
			},
		],
	},
	de: {
		title: "Wolkenarten",
		clouds: [
			{
				name: "Cumulus",
				description:
					"Weiße, flauschige Wolken mit deutlichen Formen. Zeigen normalerweise gutes Wetter an.",
			},
			{
				name: "Stratus",
				description:
					"Graue, geschichtete Wolken, die den ganzen Himmel bedecken. Können Nieselregen bringen.",
			},
			{
				name: "Cirrus",
				description:
					"Hohe, dünne Wolken, die Federn ähneln. Bestehen aus Eiskristallen.",
			},
			{
				name: "Nimbus",
				description:
					"Dunkle Regenwolken. Bringen atmosphärische Niederschläge.",
			},
		],
	},
};
