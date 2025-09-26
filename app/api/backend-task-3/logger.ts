interface LogEntry {
  timestamp: string;
  method: string;
  url: string;
  status: number;
  duration: number;
}

const requestLogs: LogEntry[] = [];

// INSTRUCTIONS:
// Implement addLog() function with arguments:
//   method: string,
//   url: string,
//   status: number,
//   duration: number
// that stores logs in requestLogs array.
// And call it inside endpoints.
// Implement getLogs() to retrieve all stored logs for display in reversed order.

export function addLog(
  method: string,
  url: string,
  status: number,
  duration: number
) {}

export function getLogs(): LogEntry[] {
  return null as unknown as LogEntry[];
}
