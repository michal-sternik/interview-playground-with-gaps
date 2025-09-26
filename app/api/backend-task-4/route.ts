import { type NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const JSON_FILE = path.join(
  process.cwd(),
  "app",
  "api",
  "backend-task-4",
  "data.json"
);

// TODO: Implement simple JSON file update endpoints
// INSTRUCTIONS:
// 1. GET endpoint:
//    - Use fs.readFile(filePath, "utf8") to read the file
//    - Use JSON.parse() to convert string to object
//    - Return with NextResponse.json({ data: parsedData })
//
// 2. POST endpoint:
//    - Get data from request.json()
//    - Read current file with fs.readFile(filePath, "utf8")
//    - Parse with JSON.parse()
//    - Update json with new data from request
//    - Save with fs.writeFile(filePath, JSON.stringify(data, null, 2))
//    - Return success response
//
// REMOVE BEFORE HANDOVER: The code below is a complete implementation - remove it and let the candidate write their own
