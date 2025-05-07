module.exports = {
    verbose: true,
    preset: "ts-jest",
    testEnvironment: "node",
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/lib/$1",
    },
    setupFiles: ["<rootDir>/tests/env.ts"],
    testMatch: ["<rootDir>/tests/**/*.test.ts"],
    testTimeout: 20000,
}
