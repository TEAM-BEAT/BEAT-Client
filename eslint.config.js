import globals from "globals";
import { createRequire } from "module";

const require = createRequire(import.meta.url);

const jsConfig = {
  ignores: ["dist", "build", "public"],
  languageOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    parser: require("@typescript-eslint/parser"),
    globals: {
      ...globals.browser,
      ...globals.node,
    },
  },
  plugins: {
    "@typescript-eslint": require("@typescript-eslint/eslint-plugin"),
    "react-refresh": require("eslint-plugin-react-refresh"),
    prettier: require("eslint-plugin-prettier"),
    "react-hooks": require("eslint-plugin-react-hooks"),
    //"eslint-plugin-react": require("eslint-plugin-react"),
  },
  rules: {
    "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
    "prettier/prettier": [
      "warn",
      {
        endOfLine: "auto",
      },
    ],
    eqeqeq: "error",
    curly: "error",
    quotes: ["error", "double"],
    "comma-style": ["error", "last"],
    "no-unused-vars": ["off", { varsIgnorePattern: "^React$" }],
    "no-console": "warn",
    "no-extra-semi": "error",
    // "no-unused-expressions": "error",
    indent: "off", // prettier 충돌로 인해 off
    semi: ["warn", "always"],
    "no-undef": "error",
    "no-trailing-spaces": "warn",
    "no-multiple-empty-lines": "warn",
    "arrow-spacing": "warn",
    "no-const-assign": "error",
    "no-multi-spaces": "error",
    "prefer-const": "error",
    "no-else-return": "warn",
    "no-floating-decimal": "error",
    "no-new-object": "error",
    "no-param-reassign": "error",
    "prefer-template": "warn",
    radix: "error",
    "no-useless-constructor": "error",
    "no-alert": "warn",
    "no-empty-pattern": "warn",
    "no-eval": "error",
    "no-implicit-globals": "error",
    "no-implied-eval": "error",
    "no-loop-func": "error",
    "no-iterator": "error",
    "no-new-wrappers": "error",
    "no-restricted-globals": "error",
    "no-return-assign": "warn",
    "@typescript-eslint/no-explicit-any": "warn", // any 허용
    "@typescript-eslint/no-unused-vars": ["off", { varsIgnorePattern: "^React$" }], // 'React' 사용 안해도 경고하지 않도록 설정
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  env: {
    browser: true, // 브라우저 환경 전역 변수를 사용하도록 설정
  },
};

const baseConfig = {
  files: ["**/*.js", "**/*.ts", "**/*.jsx", "**/*.tsx"],
  languageOptions: jsConfig.languageOptions,
  plugins: jsConfig.plugins,
  rules: jsConfig.rules,
  settings: jsConfig.settings,
};

export default [baseConfig];
