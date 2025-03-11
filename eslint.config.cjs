const pluginPrettier = require('eslint-plugin-prettier');
const pluginJs = require('@eslint/js');
const tseslint = require('@typescript-eslint/eslint-plugin');
const pluginReact = require('eslint-plugin-react');
const parser = require('@typescript-eslint/parser'); // Ensure parser is set to the TypeScript parser

module.exports = [
  {
    files: ['**/*.{js,ts,jsx,tsx}'],
    languageOptions: {
      parser: parser, // Correctly reference the TypeScript parser
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        jsx: true,
      },
      globals: {
        window: true, // equivalent to browser: true
        document: true,
      },
    },
    plugins: {
      prettier: pluginPrettier,
      '@typescript-eslint': tseslint,
      react: pluginReact,
    },
    settings: {
      react: {
        version: 'detect', // Automatically detects the React version
      },
    },
    rules: {
      'prettier/prettier': 'error',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'error',
      ...pluginJs.configs.recommended.rules,
      ...tseslint.configs.recommended.rules,
      ...pluginReact.configs.recommended.rules,
    },
  },
];
