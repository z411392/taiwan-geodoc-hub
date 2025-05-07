module.exports = {
    verbose: true,
    preset: "ts-jest",
    testEnvironment: "node",
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1",
    },
    setupFiles: ["<rootDir>/setup.test.ts"],
    testMatch: ["<rootDir>/src/**/*.test.ts"],
    testTimeout: 20000,
}
