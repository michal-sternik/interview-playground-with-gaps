"use client";

import { ArrowLeft, Lock, User, LogIn, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

// BACKEND TASK 2: Simple Token-Based Authentication
//
// GOAL: Create basic authentication system using access tokens
//
// REQUIREMENTS:
// 1. Implement the following API endpoints:
//    - POST /api/backend-task-2/login - User login with token generation
//    - POST /api/backend-task-2/logout - User logout (token invalidation)
//
// 2. User credentials (hardcoded for this task):
//    - Username: "user", Password: "password123"
//
// 3. Token system:
//    - Generate simple random token on login: Math.random().toString(36).substring(2)
//    - Store tokens in memory Map<string, string>: tokens.set(token, username)
//    - Send token in response: { token: "abc123", username: "user" }
//    - Client sends token in Authorization header: "Bearer abc123" (information for logout purposes)
//
// 4. Authentication flow:
//    - Login: Check credentials → Generate token → Store in memory → Return token
//    - Logout: Remove token from storage (from Map)
//
// 5. Implementation hints:
//    - Use request.headers.get("authorization") to get token
//    - Use authorization.split(" ")[1] to extract token from "Bearer abc123"
//    - Use Map<string, string> for token storage: tokens.set(token, username)
//    - Use Math.random().toString(36) for token generation
//
// FILES TO MODIFY:
// - /api/backend-task-2/login/route.ts (POST)
// - /api/backend-task-2/logout/route.ts (POST)
//
// EXAMPLE USAGE:
// POST /api/backend-task-2/login
// Body: { "username": "user", "password": "password123" }

interface AuthState {
  isAuthenticated: boolean;
  username: string | null;
  token: string | null;
}

export default function BackendTask2() {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    username: null,
    token: null,
  });
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [profileData, setProfileData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Simple profile data that shows after successful login
  const getProfileData = (username: string) => {
    return {
      message: "Profile loaded successfully!",
      user: {
        username: username,
        email: `${username}@company.com`,
        loginTime: new Date().toISOString(),
        status: "active",
      },
      serverInfo: {
        serverTime: new Date().toISOString(),
        version: "1.0.0",
      },
    };
  };

  const login = async () => {
    if (!loginForm.username.trim() || !loginForm.password.trim()) {
      setError("Username and password are required");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/backend-task-2/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginForm),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Login failed");
        return;
      }

      // Store token in localStorage
      localStorage.setItem("authToken", data.token);

      // Load profile data automatically
      const userProfileData = getProfileData(data.username);
      setProfileData(userProfileData);

      setAuthState({
        isAuthenticated: true,
        username: data.username,
        token: data.token,
      });

      setLoginForm({ username: "", password: "" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    const token = localStorage.getItem("authToken");
    try {
      if (token) {
        await fetch("/api/backend-task-2/logout", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
      localStorage.removeItem("authToken");
      setAuthState({
        isAuthenticated: false,
        username: null,
        token: null,
      });
      setProfileData(null);
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  // Check for existing token on component mount
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      // For demo purposes, we'll just show that a token exists
      // In real implementation, you'd verify the token with the server
      setAuthState({
        isAuthenticated: false, // Set to false so user has to implement login
        username: null,
        token: null,
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 p-6">
      <div className="max-w-4xl mx-auto">
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
              <Lock className="h-5 w-5" />
              Backend Task 2: Simple Token-Based Authentication
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Simple token-based login system - implement login & logout
              endpoints
            </p>
            <div className="text-sm text-gray-600">
              <p>
                <strong>Test Credentials:</strong>
              </p>
              <p>• Username: "user", Password: "password123"</p>
            </div>
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
          {/* Authentication */}
          <div>
            {!authState.isAuthenticated ? (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <LogIn className="h-5 w-5" />
                    Login
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Input
                        placeholder="Username"
                        value={loginForm.username}
                        onChange={(e) =>
                          setLoginForm({
                            ...loginForm,
                            username: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <Input
                        type="password"
                        placeholder="Password"
                        value={loginForm.password}
                        onChange={(e) =>
                          setLoginForm({
                            ...loginForm,
                            password: e.target.value,
                          })
                        }
                      />
                    </div>
                    <Button
                      onClick={login}
                      className="w-full"
                      disabled={loading}
                    >
                      {loading ? "Logging in..." : "Login"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Welcome, {authState.username}!
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 bg-green-50 rounded-lg">
                      <p className="text-sm text-green-700">
                        <strong>Access Token:</strong>{" "}
                        {authState.token?.substring(0, 20)}...
                      </p>
                      <p className="text-sm text-green-700">
                        <strong>Username:</strong> {authState.username}
                      </p>
                      <p className="text-sm text-green-700">
                        <strong>Status:</strong> Authenticated
                      </p>
                    </div>
                    <Button
                      onClick={logout}
                      variant="destructive"
                      className="w-full"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Profile Data */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Profile Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                {!authState.isAuthenticated ? (
                  <p className="text-center text-gray-500 py-8">
                    Please login to view your profile information
                  </p>
                ) : profileData ? (
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-semibold text-blue-800 mb-2">
                        Profile Data:
                      </h4>
                      <pre className="text-sm text-blue-700 overflow-auto max-h-80">
                        {JSON.stringify(profileData, null, 2)}
                      </pre>
                    </div>
                  </div>
                ) : (
                  <p className="text-center text-gray-500 py-8">
                    Loading profile information...
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
