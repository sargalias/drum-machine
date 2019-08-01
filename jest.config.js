module.exports = {
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|less|scss)$': 'identity-obj-proxy',

    '^testUtils$': '<rootDir>/testUtils',
    '^components/(.*)$': '<rootDir>/src/components/$1',
    '^abstracts/(.*)$': '<rootDir>/src/abstracts/$1',
    '^base/(.*)$': '<rootDir>/src/base/$1',
    '^customHooks/(.*)$': '<rootDir>/src/customHooks/$1',
    '^reducers/(.*)$': '<rootDir>/src/reducers/$1',
  },
  coverageThreshold: {
    global: {
      functions: 90,
      lines: 90,
    },
  },
  setupFilesAfterEnv: ['jest-extended'],
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(test).[jt]s?(x)'],
};
