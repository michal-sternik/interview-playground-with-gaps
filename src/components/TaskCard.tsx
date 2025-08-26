import { Link } from "react-router";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface TaskCardProps {
	title: string;
	description: string;
	link: string;
}

export const TaskCard = ({ title, description, link }: TaskCardProps) => {
	return (
		<Card className="flex flex-col justify-between hover:shadow-lg transition-shadow">
			<CardHeader>
				<div className="flex items-center gap-2">
					<CardTitle>{title}</CardTitle>
				</div>
			</CardHeader>
			<CardContent>
				<p className="text-sm text-gray-600 mb-4">{description}</p>
				<Link to={link}>
					<Button className="w-full">Start Task</Button>
				</Link>
			</CardContent>
		</Card>
	);
};
