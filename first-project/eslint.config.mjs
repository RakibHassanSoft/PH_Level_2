// import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

/** @type {import('eslint').Linter.Config[]} */
export default [
   // Prettier recommended rules
  //  eslintPluginPrettierRecommended,
  {
     files: ["**/*.{js,mjs,cjs,ts}"] 
  },
  { languageOptions: 
    { globals: 
      { ...globals.browser, 
        process: "readonly", 

      } 
     } 
    },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ignores: [
      "**/node_modules/**", // Ignore the node_modules directory
      "**/dist/**", // Optionally, you can also ignore the dist directory or other build artifacts
    ]
  },
  {
    rules: {
      // Disallow undefined
      "no-undefined": "error",
      // Disallow console statements except for warnings and errors
      // "no-console": ["error", { allow: ["warn", "error"] }],
      // Disallow unused variables
      "no-unused-vars": ["error", { args: "after-used", vars: "all" }],
      "@typescript-eslint/no-unused-vars": ["error", { args: "after-used", vars: "all" }],

      // Disallow unused expressions
      "no-unused-expressions": ["error", { allowShortCircuit: false, allowTernary: false, allowTaggedTemplates: false }],

      // Prefer const for variables that are never reassigned
      "prefer-const": ["error", { destructuring: "all", ignoreReadBeforeAssign: true }],

      // Additional formatting rules
      // "eqeqeq": ["error", "always"], // Require strict equality
      // "semi": ["error", "always"], // Enforce semicolons
      // "quotes": ["error", "double", { avoidEscape: true }], // Use double quotes
      // "indent": ["error", 2, { SwitchCase: 1 }], // Enforce 2-space indentation
    },
  },
];