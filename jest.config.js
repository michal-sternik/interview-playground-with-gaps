export default {
	preset: "ts-jest",
	testEnvironment: "jsdom",
	roots: ["<rootDir>/src"],
	testMatch: [
		"**/__tests__/**/*.{js,jsx,ts,tsx}",
		"**/*.(test|spec).{js,jsx,ts,tsx}",
	],
	setupFilesAfterEnv: ["<rootDir>/src/tests/setupTests.ts"],
	transform: {
		"^.+\\.(ts|tsx)$": [
			"ts-jest",
			{
				useESM: true,
				tsconfig: {
					jsx: "react-jsx",
				},
			},
		],
	},
	moduleNameMapper: {
		"\\.(css|less|scss|sass)$": "identity-obj-proxy",
		"^@/(.*)$": "<rootDir>/src/$1",
	},
	transformIgnorePatterns: ["/node_modules/(?!nanoid/)"],
	moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
	collectCoverageFrom: [
		"src/**/*.{ts,tsx}",
		"!src/**/*.d.ts",
		"!src/main.tsx",
		"!src/vite-env.d.ts",
	],
	coverageReporters: ["text", "lcov", "html"],
	extensionsToTreatAsEsm: [".ts", ".tsx"],
};
