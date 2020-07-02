module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: [
    'airbnb-base',
    'prettier'
  ],
  plugins: ["prettier"],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    //qualquer erro do prettier será retornado como erro no eslint
    "prettier/prettier": "error",
    // reagra de define que toda classe deve contem um this
    "class-methods-use-this": "off",
    // regra que exige que nenhum parametro seja reassinado com outro valor
    "no-param-reassign": "off",
    // regra que define que todas varivel deve ser declarar em modelo camelcase
    "camelcase": "off",
    //regra de destaca variaveis não utilizadas, configurando para não destacar varivel next
    "no-unused-vars": ["error", { "argsIgnorePattern": "next"}]
  },
};
