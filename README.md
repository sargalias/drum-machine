# Front End Project Starter

A very strict project configuration / boilerplate for front end projects. It features many ESLint and Stylelint plugins (including enforcing a Stylelint class pattern) and an aggressive git hook which runs on every commit.

- [Features](#features)
- [Getting started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Using in your project without future updates](#using-in-your-project-without-future-updates)
  - [Using in your project with future updates](#using-in-your-project-with-future-updates)
- [Usage](#usage)
  - [Starting the project](#starting-the-project)
  - [Building the project](#building-the-project)
  - [Running the tests](#running-the-tests)
  - [Code formatting and linting](#code-formatting-and-linting)
  - [Build pipeline](#build-pipeline)
- [Notes](#notes)
  - [Note about the git hook](#note-about-the-git-hook)
  - [Note about the code coverage threshold](#note-about-the-code-coverage-threshold)
- [Built with](#built-with)
- [License](#license)

## Features

Main features include:

- React.
- Webpack dev server for a great server with live-reloading capabilities and HTTPS.
- Dynamic imports and code splitting.
- Caching with hashes in filenames for JavaScript and CSS.
- JavaScript transpilation with Babel (options for modern browsers / IE11 commented out in babel.config.js).
- Strict ESLint and Stylelint with many plugins for good development practices
  - Stylint rule "selector-class-pattern" is enabled, enforcing a SCSS class pattern of BemBlock_bemElement\_\_\_bemModifier.
- Jest with jsdom for fast unit testing and integration testing.
  - Also enforces 90% code coverage.
- Cypress for end-to-end testing.
- Aggressive git hook to ensure the build passes in every commit, which runs:
  - Prettier code formatter in write mode.
  - ESLint and Stylelint in fix mode.
  - All the tests for Jest and Cypress, ensuring they all pass and code coverage threshold is met.
- PostCSS with things like autoprefixer and cssnano (to minify our CSS code).
- A lot of NPM scripts for different use cases.

The reason for all of these is that I believe code quality and passing tests are important. Also I believe it's ideal for a repository to always be stable, so that it's possible to revert to any commit. If really needed the git hook can always be bypassed and the test coverage threshold modified.

## Getting started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- NPM

Installation requires [NPM](https://www.npmjs.com/) which is included with [Node](https://nodejs.org/). You can install Node by downloading the installer from the website.

To update NPM to the latest version:

```
npm install -g npm@latest
```

### Installation

1. Clone the repo

```
git clone https://github.com/sargalias/front-end-project-starter.git
```

2. Install NPM packages

```
npm install
```

### Using in your project without future updates

Just delete the .git folder in your project and start a create a new git repository with `git init`.

Note: In some operating systems the .git folder is hidden. You may need to turn on the "show hidden files" option.

### Using in your project with future updates

One way to use this project is to keep a dedicated branch and remote for it. That way you can keep getting updates and merging them in your project.

#### Setup

1. Rename the remote to "config"

```
git remote rename origin config
```

2. Checkout a new branch "config"

```
git checkout -b config
```

#### Updating

1. Pull updates

```
git checkout config
git pull config master
```

2. Merge those updates in your working branch

```
git checkout my-work-branch
git merge config
```

## Usage

There are many commands / NPM scripts included.

### Starting the project

- Start the project on a local server: `npm start`

### Building the project

- Build the project for production: `npm run build`
- Build the project for development (linting errors won't fail the build): `npm run build:dev`

### Running the tests

- Start the project on a local server along with Cypress (E2E tests): `npm run start-with-cypress`
- Run all tests (Jest and Cypress): `npm run test:all`
- Run Jest tests: `npm test`
- Run Jest tests without coverage: `npm run test:no-coverage`
- Run Jest tests in watch mode: `npm run test:watch`

- Open Cypress (requires a server running): `npm run cy:open`
- Run Cypress tests: `npm run test:e2e`
- Run Cypress tests if a server is already running: `npm run cy:run`

### Code formatting and linting

- Format code with code formatter: `npm run format`
- Run lint check: `npm run lint`
- Run lint check in fix mode: `npm run lint:fix`
- Run lint check for SCSS only: `npm run lint:scss`
- Run lint check for JavaScript only: `npm run lint:js`
- Run lint check in fix mode for SCSS only: `npm run lint:fix:scss`
- Run lint check in fix mode for JavaScript only: `npm run lint:fix:js`

### Build pipeline

- Run the entire build process (code formatting, linting in fix mode, all tests): `npm run ci`

## Notes

For every option and configuration, please see the relevant documentation. E.g. for any Stylelint issues, please see the Stylelint docs and / or docs for the relevant Stylelint plugin.

### Note about the git hook

There is a pretty aggressive Git hook which runs the entire build process for every commit, ensuring linting and tests pass.

If needed, you can disable the Git hook by deleting the **.huskyrc** file, or using the `--no-verify` flag during commits.

### Note about the code coverage threshold

The code coverage threshold with Jest is set to 90%. This can be changed by modifying the jest.config.js file. The option is `coverageThreshold: { global: {/* ... */} }`.

## Built with

- [React](https://github.com/facebook/react)
- [Webpack](https://github.com/webpack/webpack) - To bundle code
  - [webpack-dev-server](https://github.com/webpack/webpack-dev-server) - Server for development
  - [webpack-merge](https://github.com/survivejs/webpack-merge) - To help us create multiple webpack configs
  - [babel-loader](https://github.com/babel/babel-loader) - To run babel as part of webpack
  - [clean-webpack-plugin](https://github.com/johnagan/clean-webpack-plugin) - To clean the destination directory for every build
  - [css-loader](https://github.com/webpack-contrib/css-loader) - To load CSS
  - [eslint-loader](https://github.com/webpack-contrib/eslint-loader) - For using ESLint with webpack
  - [file-loader](https://github.com/webpack-contrib/file-loader) - To load files (such as fonts)
  - [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin) - To use an HTML template
  - [mini-css-extract-plugin](https://github.com/webpack-contrib/mini-css-extract-plugin) - To extract CSS into separate files for production
  - [node-sass](https://github.com/sass/node-sass) - Dependency of sass-loader
  - [sass-loader](https://github.com/webpack-contrib/sass-loader) - For using SCSS with webpack
  - [sass-resources-loader](https://github.com/shakacode/sass-resources-loader) - For "globally importing" sass resources such as variables and mixins
  - [stylelint-webpack-plugin](https://github.com/webpack-contrib/stylelint-webpack-plugin) - To run Stylelint as part of webpack
  - [style-loader](https://github.com/webpack-contrib/style-loader) - For adding CSS directly to the page in development
- [PostCSS](https://github.com/postcss/postcss)
  - [Autoprefixer](https://github.com/postcss/autoprefixer) - To add vendor prefixes to CSS
  - [cssnano](https://github.com/cssnano/cssnano) - To minify CSS
- [Jest](https://github.com/facebook/jest) - Test framework
  - [identity-obj-proxy](https://github.com/keyz/identity-obj-proxy) - To allow us to see CSS classes in the DOM
  - [jest-extended](https://github.com/jest-community/jest-extended) - More awesome assertions for Jest
- [Cypress](https://github.com/cypress-io/cypress) - End-to-end testing framework
- [React testing library](https://github.com/testing-library/react-testing-library) - Test utilities for React
- [Cypress testing library](https://github.com/testing-library/cypress-testing-library) - Test utilities for Cypress
- [ESLint](https://github.com/eslint/eslint) - JavaScript static code analysis
  - [eslint-config-airbnb](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb) - Aribnb's .eslintrc
  - [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier) - For using Prettier with ESLint
  - [eslint-plugin-array-func](https://github.com/freaktechnik/eslint-plugin-array-func) - Rules for arrays functions and methods
  - [eslint-plugin-import](https://github.com/benmosher/eslint-plugin-import) - Helps validate proper imports
  - [eslint-plugin-import-resolver-webpack](https://www.npmjs.com/package/eslint-import-resolver-webpack) - Import resolver for webpack
  - [eslint-plugin-cypress](https://github.com/cypress-io/eslint-plugin-cypress) - Rules and globals for Cypress
  - [eslint-plugin-jest](https://github.com/jest-community/eslint-plugin-jest) - Rules and globals for Jest
  - [eslint-plugin-jsx-a11y](https://github.com/evcohen/eslint-plugin-jsx-a11y) - Rules for accessibility with JSX
  - [eslint-plugin-no-loops](https://github.com/buildo/eslint-plugin-no-loops) - Encourages array methods instead of traditional for loops and such
  - [eslint-plugin-no-use-extend-native](https://github.com/dustinspecker/eslint-plugin-no-use-extend-native) - Rules for not extending built-in prototypes
  - [eslint-plugin-prettier](https://github.com/prettier/eslint-plugin-prettier) - Runs prettier as an ESLint rule
  - [eslint-plugin-promise](https://github.com/xjamundx/eslint-plugin-promise) - Rules for good promise usage
  - [eslint-plugin-react](https://github.com/yannickcr/eslint-plugin-react) - Rules for React
  - [eslint-plugin-react-hooks](https://github.com/facebook/react/tree/master/packages/eslint-plugin-react-hooks) - Rules for React hooks
  - [eslint-plugin-security](https://github.com/nodesecurity/eslint-plugin-security) - Rules preventing unsafe use of JavaScript
  - [eslint-plugin-xss](https://github.com/Rantanen/eslint-plugin-xss) - Rules for detecting XSS issues
  - [eslint-plugin-sonarjs](https://github.com/SonarSource/eslint-plugin-sonarjs) - SonarJS rules
- [Stylelint](https://github.com/stylelint/stylelint) - CSS static code analysis
  - [stylelint-config-idiomatic-order](https://github.com/ream88/stylelint-config-idiomatic-order) - Imposes an order for CSS declarations
  - [stylelint-config-prettier](https://github.com/prettier/stylelint-config-prettier) - For using Prettier with Stylelint
  - [stylelint-config-recommended](https://github.com/stylelint/stylelint-config-recommended) - Recommended configuration for Stylelint
  - [stylelint-declaration-use-variable](https://github.com/sh-waqar/stylelint-declaration-use-variable) - For enforcing variable usage for values in CSS
  - [stylelint-scss](https://github.com/kristerkari/stylelint-scss) - SCSS specific rules
- [Babel](https://github.com/babel/babel) - To transpile code
  - [@babel/preset-env](https://github.com/babel/babel/tree/master/packages/babel-preset-env) - To transpile code in tests
  - [@babel/preset-react](https://github.com/babel/babel/tree/master/packages/babel-preset-react) - To transpile JSX
  - [babel-jest](https://github.com/facebook/jest/tree/master/packages/babel-jest) - For Jest to transpile code
  - [babel-plugin-dynamic-import-node](https://github.com/airbnb/babel-plugin-dynamic-import-node) - To enable dynamic imports in Node (for tests)
  - [babel-plugin-syntax-dynamic-import](https://github.com/babel/babel/tree/master/packages/babel-plugin-syntax-dynamic-import) - To enable dynamic imports in the browser
- [Husky](https://github.com/typicode/husky) - Simple Git hooks
  - [lint-staged](https://github.com/okonet/lint-staged) - To allow us to run commands on git staged files
- [npm-run-all](https://github.com/mysticatea/npm-run-all) - To allow us to run multiple NPM commands in scripts
- [live-server](https://github.com/tapio/live-server) - Simple server for Cypress tests
  - [live-server-https](https://github.com/pirtleshell/live-server-https) - For live-server HTTPS.
- [Prettier](https://github.com/prettier/prettier) - Code formatting
  - [pretty-quick](https://github.com/azz/pretty-quick) - Git hook helper for running prettier for staged files

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
