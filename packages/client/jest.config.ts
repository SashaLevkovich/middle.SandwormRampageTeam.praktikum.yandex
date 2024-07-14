// eslint-disable-next-line @typescript-eslint/no-var-requires
import * as process from 'process'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const dotenv = require('dotenv')
dotenv.config()

export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/src/**/*.test.{ts,tsx}'],
  globals: {
    __SERVER_PORT__: process.env.SERVER_PORT,
    __EXTERNAL_SERVER_URL__: process.env.EXTERNAL_SERVER_URL,
    __INTERNAL_SERVER_URL__: process.env.INTERNAL_SERVER_URL,
  },
  moduleDirectories: ['node_modules', 'src'],
  moduleNameMapper: {
    '\\.scss$': 'identity-obj-proxy',
  },
}
