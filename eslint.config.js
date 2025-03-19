import eslintConfigModule from '@drom/eslint-config';
const eslintConfig = Array.isArray(eslintConfigModule)
  ? eslintConfigModule
  : eslintConfigModule.default || [];
export default [
  {
    ignores: [
      "build/**/*",
      "build-cjs/**/*",
      "node_modules/**",
      "coverage/**/*"
    ]
  },
  ...eslintConfig,
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: await import('@typescript-eslint/parser'),
      parserOptions: {
        project: './tsconfig.test.json',
        ecmaVersion: 2022,
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': (await import('@typescript-eslint/eslint-plugin')).default,
    },
    rules: {
      "no-console": "warn"
    },
  },
  {
    files: ["test/**/*.ts"],
    languageOptions: {
      globals: {
        describe: "readonly",
        it: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly"
      }
    },
  }
];
