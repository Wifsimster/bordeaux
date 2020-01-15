module.exports = {
  root: true,
  extends: ["eslint:recommended", "plugin:vue/essential", "plugin:node/recommended"],
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "babel-eslint",
    ecmaVersion: 2018,
    sourceType: "module"
  },
  plugins: ["vue"],
  rules: {
    "linebreak-style": "off", // don't matter line ending style
    indent: ["error", 2], // indent with 2 spaces
    quotes: ["error", "single"], // force single quotes
    semi: ["error", "never"], // remove semicolons
    eqeqeq: "warn", // require === and !==
    "default-case": "warn", // require default case in switch statements
    "no-implicit-coercion": "warn", // disallows implicit type conversion methods
    "no-magic-numbers": [
      "warn",
      {
        // forbid magic numbers (force declaring const)
        ignore: [-1, 0, 1, 2]
      }
    ],
    yoda: "warn", // requires 'yoda' condition statements
    "no-var": "warn", // requires let or const, not var
    "no-debugger": "warn",

    "vue/max-attributes-per-line": [
      "warn",
      {
        singleline: 4,
        multiline: { max: 3, allowFirstLine: false }
      }
    ],
    "vue/singleline-html-element-content-newline": [
      "warn",
      {
        ignoreWhenNoAttributes: true,
        ignoreWhenEmpty: true,
        ignores: ["alert", "i", "span", "template", "btn"]
      }
    ],
    "vue/html-indent": [
      "warn",
      2,
      {
        attribute: 1,
        baseIndent: 1,
        closeBracket: 0,
        alignAttributesVertically: true,
        ignores: []
      }
    ],
    "vue/html-closing-bracket-spacing": [
      "warn",
      {
        startTag: "never",
        endTag: "never",
        selfClosingTag: "always"
      }
    ]
  }
};
