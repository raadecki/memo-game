# Memo Game

Memo game implementation in ReactJS and NodeJS

## Architecture
- One statefull component - App
- Card, CardGrid, Highscore, RegisterPlayer and Toollbar are stateless inherit from PureComponent, all data are passed using props
- logic folder - app logic layer. Functions to manipulate state and communicate with server, underneath it uses lodash/fp for immutability, functions in this module are pure (with one exception cardShuffle helper function). Returns either state or promise that resolves with state
- handlers - react <-> logic layer, event function that are executed within app context, those functions aren't pure. They execute setState each time state was modified by logic functions to nnotify react about changes

Idea was to move all logic away from React and apply it through event functions. We can call it a subset of DDD, also all functions that manipulate state are tested.

## Swagger docs
After `yarn start` documentation is available at `http://127.0.0.1:8080/documentation`. Use it as tests for backend since all of the logic there requires mocks to be tested, so using docs is better solution.

## Potential improvements

- replace lodash with RamdaJS
- apply react-redux with some frp to remove not-so-pretty function
- create pure components with functions rather than classes

## Requirements

Tested on Chrome since it has native support for fetch function
Install `yarn`, read how [here](https://yarnpkg.com/en/docs/install).

## Installation

Run the following commands:

1. `git clone git@github.com:DPOrganizer/react-boilerplate.git`
2. `cd react-boilerplate`
3. `yarn install`

To start the application you can now run: `yarn start`

## Available commands

- `yarn lint` Run code linting
- `yarn test` Run tests using jest
- `yarn test-coverage` Run tests using jest and display coverage
- `yarn build` Bundle the application
- `yarn start` Run the development environment
- `yarn deploy` Build the application in production mode
- `yarn deploy-windows` Build the application in production mode under Windows


