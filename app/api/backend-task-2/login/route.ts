import { type NextRequest, NextResponse } from "next/server";

// In-memory token storage
const tokens = new Map<string, string>();

// Hardcoded users for this task
const users: Record<string, string> = {
  user: "password123",
};

// TODO: Implement token-based authentication
// INSTRUCTIONS:
// 1. Check username/password against hardcoded users (check if username exists and password matches)
// 2. Generate token with: Math.random().toString(36).substring(2) + Date.now().toString(36)
// 3. Store token in Map: tokens.set(token, username)
// 4. Return: { token: generatedToken, username: username, message: "Login successful" }
// 5. After successful login, frontend will automatically show profile data
//
// REMOVE BEFORE HANDOVER: The code below is a complete implementation - remove it and let the candidate write their own
