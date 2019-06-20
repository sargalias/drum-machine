module.exports = {
  extends: [
    'stylelint-config-recommended',
    'stylelint-prettier/recommended',
    'stylelint-config-idiomatic-order',
  ],
  plugins: ['stylelint-scss', 'stylelint-declaration-use-variable'],
  rules: {
    'at-rule-empty-line-before': null,
    'sh-waqar/declaration-use-variable': [['color', 'background-color']],
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': true,
    'selector-class-pattern': [
      '^([A-Z][a-zA-Z0-9]*)(_[a-z0-9][a-zA-Z0-9]*)?(___[a-z0-9][a-zA-Z0-9]*)?$',
      { resolveNestedSelectors: true },
    ],
  },
};
