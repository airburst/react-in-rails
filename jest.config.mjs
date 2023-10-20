import { defaults } from "jest-config";

export default {
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/app/javascript/src/QCP/__mocks__/fileMock.js",
    "\\.(css|less)$": "<rootDir>/jestCssMock.js",
    "^@/(.*)$": "<rootDir>/app/javascript/src/QCP/$1",
    "^@components/(.*)$": "<rootDir>/app/javascript/src/QCP/components/$1",
    "^@contexts/(.*)$": "<rootDir>/app/javascript/src/QCP/contexts/$1",
    "^@hooks/(.*)$": "<rootDir>/app/javascript/src/QCP/hooks/$1",
    "^@services/(.*)$": "<rootDir>/app/javascript/src/QCP/services/$1",
    "^@utils/(.*)$": "<rootDir>/app/javascript/src/QCP/utils/$1",
    "^@api/(.*)$": "<rootDir>/app/javascript/src/QCP/api/$1",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testPathIgnorePatterns: [
    ...defaults.testPathIgnorePatterns,
    "config/webpack/test.js",
  ],
  extensionsToTreatAsEsm: [".tsx", ".jsx"],
  preset: "ts-jest",
  transform: {
    "^.+\\.(ts|tsx)?$": "ts-jest",
    "^.+\\.(js|jsx)$": "babel-jest",
  },
};
