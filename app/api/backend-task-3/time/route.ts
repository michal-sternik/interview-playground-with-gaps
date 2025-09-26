import { NextResponse } from "next/server";
import { addLog } from "../logger";

// TODO: Implement time endpoint with request logging
// INSTRUCTIONS:
// 1. Measure request time: const startTime = Date.now()
// 2. Create response with current time:
//        time: now.toISOString(),
//        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
// 3. Calculate duration: const duration = Date.now() - startTime
// 4. Log the request: addLog("GET", "/api/backend-task-3/time", statusCode, duration)
// 5. Return the response

// TODO: Implement server time endpoint with logging
// REMOVE BEFORE HANDOVER: The code below is a complete implementation - remove it and let the candidate write their own
