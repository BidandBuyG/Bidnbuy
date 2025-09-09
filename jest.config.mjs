const config = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  extensionsToTreatAsEsm: [".ts", ".tsx"],
  transform: {
    "^.+\\.(ts|tsx)$": [
      "ts-jest",
      {
        useESM: true,
        tsconfig: {
          jsx: "react-jsx",
          module: "esnext",
          target: "es2019"
        }
      }
    ],
  },
  transformIgnorePatterns: ["node_modules/(?!(@hookform|zod)/)"],
  moduleNameMapper: {
    "^@/features/assets/(.*)$": "<rootDir>/test/__mocks__/fileMock.js",
    "^@/(.*)$": "<rootDir>/src/$1",
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "\\.(png|jpe?g|gif|svg|webp)$": "<rootDir>/test/__mocks__/fileMock.js",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};

export default config;
