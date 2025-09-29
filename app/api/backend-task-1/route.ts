import { type NextRequest, NextResponse } from "next/server";

export const tasks: TaskItem[] = [];

interface TaskItem {
	id: string;
	title: string;
	description: string;
	completed: boolean;
	createdAt: string;
}

// TODO: Implement in-memory storage for tasks
// REMOVE BEFORE HANDOVER: The code below is a complete implementation - remove it and let the candidate write their own
