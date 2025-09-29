import { type NextRequest, NextResponse } from "next/server";

// TODO: Implement token-based logout
// INSTRUCTIONS:
// 1. Get token from Authorization header: request.headers.get("authorization")
// 2. Extract token: authorization.split(" ")[1] (from "Bearer abc123")
// 3. Remove token from storage: tokens.delete(token)
// 4. Return success message
//
// REMOVE BEFORE HANDOVER: The code below is a complete implementation - remove it and let the candidate write their own

const tokens = new Map<string, string>(); // token -> username
