// Shared ESLint flat config for the XStreamRoll monorepo.
// Resolves #42: Add ESLint and Prettier config across all packages.
//
// Each workspace package (api, app, xstreamroll-sdk, xstreamroll-processing)
// can run lint against this config from its own "lint" script.

const ignores = [
  "**/node_modules/**",
  "**/dist/**",
  "**/build/**",
  "**/.next/**",
  "**/coverage/**",
  "**/*.d.ts",
  "**/*.config.js",
  "**/*.config.mjs",
  "**/next-env.d.ts",
]

module.exports = [
  {
    ignores,
  },
  {
    files: ["**/*.{ts,tsx,js,jsx,mjs,cjs}"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        // Node
        process: "readonly",
        console: "readonly",
        Buffer: "readonly",
        __dirname: "readonly",
        __filename: "readonly",
        module: "readonly",
        require: "readonly",
        exports: "readonly",
        global: "readonly",
        // Browser / DOM
        window: "readonly",
        document: "readonly",
        navigator: "readonly",
        fetch: "readonly",
        // Common test
        describe: "readonly",
        it: "readonly",
        test: "readonly",
        expect: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly",
        beforeAll: "readonly",
        afterAll: "readonly",
        jest: "readonly",
      },
    },
    rules: {
      "no-unused-vars": "off",
      "no-undef": "off",
      "no-empty": ["warn", { allowEmptyCatch: true }],
      "no-console": "off",
      "prefer-const": "warn",
      eqeqeq: ["error", "always", { null: "ignore" }],
    },
  },
]
