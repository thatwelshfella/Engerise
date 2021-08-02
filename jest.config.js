module.export = {
    roots: ["<rootDir>/client/src"],
    moduleFileExtensions: ["js", "jsx", "json", "node"],
    testPathIgnorePatterns: ["/node_modules/", "/public/"],
    testEnvironment: "jsdom",
    setupFilesAfterEnv: ["<rootDir>/setupTest.js"],
    coverageDirectory:"./coverage",
    collectCoverageFrom: [
      "**/*.{js,jsx}",
      "!**/node_modules/**",
      "!**/vendor/**",
    ],
    coverageReporter:["json","html","text-summary"],
    collectCoverage:true,
    coverageThreshold: {
      "global": {
        "branches": 50,
      },
    },
  };