const isCI = require("is-ci");

/** @type {Partial<import("@jest/types").Config.DefaultOptions>} */
module.exports = {
    testMatch: ["**/test/**/*.spec.ts"],
    testEnvironment: "node",
    testRunner: "jest-circus/runner",
    preset: "ts-jest",
    globals: {
        "ts-jest": {
            tsconfig: "<rootDir>/test/tsconfig.json",
            diagnostics: { warnOnly: !isCI },
        },
    },
};
