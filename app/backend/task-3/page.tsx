"use client";

import { ArrowLeft, Server, Activity, Clock, List } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// BACKEND TASK 3: Server with Request Logging (Medium Article)
//
// GOAL: Create a server with custom request logging functionality
//
// FILES TO MODIFY:
// - /api/backend-task-3/status/route.ts (GET)
// - /api/backend-task-3/time/route.ts (GET)
// - /api/backend-task-3/logs/route.ts (GET)
// - /api/backend-task-3/logger.ts (logging functions)
//
// REQUIREMENTS:
// 1. Implement the following API endpoints:
//    - GET /api/backend-task-3/status - Server status endpoint
//    - GET /api/backend-task-3/time - Current server time
//    - GET /api/backend-task-3/logs - Get request logs
//
// 2. Add logging to each endpoint that records:
//    - Timestamp (ISO string)
//    - HTTP method
//    - Request URL
//    - Response status code
//    - Request duration in milliseconds
//
// 3. Log format example:
//    "[2024-01-15T10:30:45.123Z] GET /api/backend-task-3/status - 200 - 15ms"
//
// 4. Server responses:
//    - GET /api/backend-task-3/status: { status: "OK", uptime: number, timestamp: string }
//    - GET /api/backend-task-3/time: { time: string, timezone: string }
//    - GET /api/backend-task-3/logs: { logs: LogEntry[], message: string }
//
// 5. Implementation steps:
//    a) Create logger.ts with addLog() and getLogs() functions
//    b) In each endpoint: measure time, call addLog() after response
//    c) Store logs in memory (array in logger.ts), keep last 100 entries
//

interface ServerStatus {
  status: string;
  uptime: number;
  timestamp: string;
}

interface TimeResponse {
  time: string;
  timezone: string;
}

interface LogEntry {
  timestamp: string;
  method: string;
  url: string;
  status: number;
  duration: number;
}

interface LogsResponse {
  logs: LogEntry[];
  message: string;
}

export default function BackendTask3() {
  const [serverStatus, setServerStatus] = useState<ServerStatus | null>(null);
  const [currentTime, setCurrentTime] = useState<TimeResponse | null>(null);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchServerStatus = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/backend-task-3/status");
      if (!response.ok) throw new Error("Failed to fetch server status");
      const data = await response.json();
      setServerStatus(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
    fetchLogs();
  };

  const fetchCurrentTime = async () => {
    setError(null);
    try {
      const response = await fetch("/api/backend-task-3/time");
      if (!response.ok) throw new Error("Failed to fetch server time");
      const data = await response.json();
      setCurrentTime(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    }
    fetchLogs();
  };

  const fetchLogs = async () => {
    setError(null);
    try {
      const response = await fetch("/api/backend-task-3/logs");
      if (!response.ok) throw new Error("Failed to fetch logs");
      const data: LogsResponse = await response.json();
      setLogs(data.logs);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    }
  };

  useEffect(() => {
    fetchServerStatus();
    fetchCurrentTime();
    fetchLogs();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-teal-100 p-6">
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
              <Server className="h-5 w-5" />
              Backend Task 3: Server with Request Logging
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              Based on the Medium article example - implement server endpoints
              with custom request logging functionality
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
          {/* Server Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Server Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button
                  onClick={fetchServerStatus}
                  className="w-full"
                  disabled={loading}
                >
                  {loading ? "Checking..." : "Check Server Status"}
                </Button>

                {serverStatus && (
                  <div className="p-4 bg-green-50 rounded-lg">
                    <p>
                      <strong>Status:</strong> {serverStatus.status}
                    </p>
                    <p>
                      <strong>Uptime:</strong> {serverStatus.uptime}ms
                    </p>
                    <p>
                      <strong>Timestamp:</strong>{" "}
                      {new Date(serverStatus.timestamp).toLocaleString()}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Server Time */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Server Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button onClick={fetchCurrentTime} className="w-full">
                  Get Current Time
                </Button>

                {currentTime && (
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <p>
                      <strong>Time:</strong> {currentTime.time}
                    </p>
                    <p>
                      <strong>Timezone:</strong> {currentTime.timezone}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Request Logs */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <List className="h-5 w-5" />
                Request Logs (Last 100 requests)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* <Button onClick={fetchLogs} className="w-full">
                  Refresh Logs
                </Button> */}

                {logs.length === 0 ? (
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-center text-gray-500">
                      No logs available. Make some requests to see logs appear
                      here.
                    </p>
                  </div>
                ) : (
                  <div className="p-4 bg-gray-50 rounded-lg max-h-96 overflow-auto">
                    <h4 className="font-semibold mb-3">Request Logs:</h4>
                    <div className="space-y-1 font-mono text-xs">
                      {logs.map((log, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center py-1 px-2 bg-white rounded border-l-4 border-l-blue-500"
                        >
                          <div className="flex-1">
                            <span className="text-gray-500">
                              [{new Date(log.timestamp).toLocaleTimeString()}]
                            </span>{" "}
                            <span
                              className={`font-semibold ${
                                log.method === "GET"
                                  ? "text-green-600"
                                  : log.method === "POST"
                                  ? "text-blue-600"
                                  : "text-purple-600"
                              }`}
                            >
                              {log.method}
                            </span>{" "}
                            <span className="text-gray-800">{log.url}</span>
                          </div>
                          <div className="flex gap-2">
                            <span
                              className={`px-2 py-1 rounded text-xs ${
                                log.status >= 200 && log.status < 300
                                  ? "bg-green-100 text-green-800"
                                  : log.status >= 400
                                  ? "bg-red-100 text-red-800"
                                  : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {log.status}
                            </span>
                            <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                              {log.duration}ms
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
