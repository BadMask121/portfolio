module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    jest: true,
  },
  // Avoid introducing prettier, it does not follow the standards of the framework
  // ref: https://github.com/prettier/prettier/issues?q=is%3Aissue+is%3Aopen+vue
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:vue/recommended",
    "plugin:prettier-vue/recommended",
  ],
  rules: {
    "no-console": "warn",
    "no-debugger": "warn",
    "no-useless-constructor": 0,
    "class-methods-use-this": 0,
    "max-lines": ["error", 1312],
    "no-empty-function": ["error", { allow: ["constructors"] }],
    "@typescript-eslint/interface-name-prefix": 0,
    "@typescript-eslint/no-parameter-properties": 0,
    "@typescript-eslint/explicit-module-boundary-types": 0,
    "@typescript-eslint/no-use-before-define": ["error", { functions: false }],
    "@typescript-eslint/explicit-function-return-type": ["error", { allowExpressions: true }],
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    "prettier-vue/prettier": ["error", { endOfLine: "auto" }],
    "import/extensions": 0,
    "import/no-extraneous-dependencies": 0,
    "vue/multi-word-component-names": 0,
  },
  parserOptions: {
    parser: "@typescript-eslint/parser",
    ecmaVersion: 2018,
    ecmaFeatures: {
      experimentalDecorators: true,
    },
    sourceType: "module",
  },
  settings: {
    "prettier-vue": {
      SFCBlocks: {
        template: false,
        script: true,
        style: true,
      },
      usePrettierrc: true,
    },
  },
  overrides: [
    {
      files: ["**/__tests__/*.{j,t}s?(x)"],
      env: {
        jest: true,
      },
    },
    {
      files: ["*.js"],
      rules: {
        "@typescript-eslint/no-var-requires": 0,
      },
    },
  ],
};
