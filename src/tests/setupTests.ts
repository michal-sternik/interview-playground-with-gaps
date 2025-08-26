/* eslint-disable @typescript-eslint/no-explicit-any */
/** biome-ignore-all lint/suspicious/noExplicitAny: <any for now> */
import "@testing-library/jest-dom";

// Mock dla fetch API
global.fetch = jest.fn();

// Add TextEncoder/TextDecoder for React Router
import { TextDecoder, TextEncoder } from "util";

(globalThis as any).TextEncoder = TextEncoder;
(globalThis as any).TextDecoder = TextDecoder;

// Mock dla localStorage
const localStorageMock = (() => {
	let store: Record<string, string> = {};

	return {
		getItem: jest.fn((key: string) => store[key] || null),
		setItem: jest.fn((key: string, value: string) => {
			store[key] = value;
		}),
		removeItem: jest.fn((key: string) => {
			delete store[key];
		}),
		clear: jest.fn(() => {
			store = {};
		}),
		length: 0,
		key: jest.fn(),
	};
})();

Object.defineProperty(window, "localStorage", {
	value: localStorageMock,
	writable: true,
});

// Reset mocks przed każdym testem
beforeEach(() => {
	jest.clearAllMocks();
	localStorageMock.clear();
});
