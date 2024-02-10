export default {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  transform: {
    "^.+\\.(ts|tsx)$": "babel-jest",
  },
  testMatch: ["**/?(*.)+(spec|test).(ts|tsx|js)"],
};
