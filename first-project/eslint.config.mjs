import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ["**/*.{js,mjs,cjs,ts}"]},
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {ignores: [
    "**/node_modules/**", // Ignore the node_modules directory
    "**/dist/**", // Optionally, you can also ignore the dist directory or other build artifacts
  ]}
];