import { NextResponse } from "next/server";
import { addLog } from "../logger";

const serverStartTime = Date.now();

// TODO: Implement server status endpoint with request logging
// INSTRUCTIONS:
// 1. Measure request time: const startTime = Date.now()
// 2. Create response with server status and timestamp: new Date().toISOString(),
// 3. Calculate duration: const duration = Date.now() - startTime. Calculate uptime with Date.now() - serverStartTime;
// 4. Log the request: addLog("GET", "/api/backend-task-3/status", statusCode, duration)
// 5. Return the response
// 6. You can try to addLog in a try (status 200) /catch (status 500) to ensure logging even on errors

// Example interface for the response structure:
// interface ServerStatusResponse {
//   status: string;        // e.g., "OK"
//   uptime: number;        // milliseconds since server start
//   timestamp: string;     // ISO string of current time
// }

// REMOVE BEFORE HANDOVER: The code below is a complete implementation - remove it and let the candidate write their own
