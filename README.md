# Ooly API

[![Build Status](https://travis-ci.org/Treast/node-authentication.svg?branch=master)](https://travis-ci.org/Treast/node-authentication)

[![Coverage Status](https://coveralls.io/repos/github/Treast/node-authentication/badge.svg?branch=master&id=1)](https://coveralls.io/github/Treast/node-authentication?branch=master&id=1)

## Requirements

- Node.js v12.0 or above - [https://nodejs.org/](https://nodejs.org/)
- Docker

## Setup

The project is based on a Docker container holding the MariaDB database, another for PHPMyAdmin.
The core of the project is running on NodeJS using Express framework ([https://expressjs.com/](https://expressjs.com/)).

## Workflow

![Schema](./schema.jpg)

## Commands

| Command                 | Description                                    |
| ----------------------- | ---------------------------------------------- |
| `npm run api`           | Regenerate the documentation                   |
| `npm run docker:build`  | Build the Docker containers                    |
| `npm run docker:start`  | Create & start the Docker containers           |
| `npm run docker:stop`   | Stop & remove the Docker containers            |
| `npm run start`         | Start the NodeJS server                        |
| `npm run migrate`       | Migrate pending migrations under `/migrations` |
| `npm run seed`          | Run seeds under `/seeders`                     |
| `npm run migrate:seed`  | Run migrations & seeds                         |
| `npm run migrate:reset` | Revert all migrations                          |
| `npm run test`          | Run all tests under `/tests`                   |

## URLs

Once Docker containers & the NodeJS server are running, these URLs become available:
|URL|Description|
|--|--|
|http://localhost:1234|PHPMyAdmin|
|http://localhost:3000|NodeJS Server|
|http://localhost:3000/docs|API Documentation|

## Coding guidelines

### Git

We use **Gitflow** as our Git workflow. [More explanation here.](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow)

### Code style & format

#### Styles

- We use **Prettier** ([https://prettier.io/](https://prettier.io/)) as code formatting tool. The configuration is written in `.prettierrc` at the root of the project. **You must NOT edit this file.**
- We use **2 _(two)_ spaces** for indentation.

#### Naming

- We use **camelCase** for `variables`, `properties`, `functions` and `methods`.
- We use **PascalCase** for `classes`.

#### Comments

- We use **apiDoc** ([https://apidocjs.com/](https://apidocjs.com/)) for functions documentation.

### Rules

Before pushing code, please make sure to :

- Include **unit tests** to test every function you've added.
- Add comments, and regenerate the documentation : `npm run api`.
- **Clean and refactor** code.
