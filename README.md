## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Start up / Usage

Use following commands to start the app

To install all necessary dependencies

```bash
$ npm install
```

###### `note`: before the first start you should run migration `npm run migration:run` for proper further use

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run app using docker

```bash
# daemon mode
$ docker compose up -d --build
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Swagger

### Use this url to check and test endpoints

http://localhost:3000/api-docs#/

### Environment variables

| Name                | Value Type Options | Default Value | Description                     |
| :------------------ | :----------------- | :------------ | :------------------------------ |
| `PORT`              | `Number`           | `3000`        | Default port                    |
| `SWAGGER_URL`       | `String`           | `api-docs`    | URL for swagger                 |
| `POSTGRES_DB`       | `String`           | `test`        | Default database name           |
| `POSTGRES_HOST`     | `String`           | `localhost`   | Default Postgresql host         |
| `POSTGRES_USER`     | `String`           | `postgres`    | Default Postgresql user         |
| `POSTGRES_PASSWORD` | `String`           | `postgres`    | Default Postgresql password     |
| `JWT_SECRET`        | `String`           | `secret`      | JWT secret to generate token    |
| `JWT_EXPIRES`       | `String`           | `60s`         | Expiration period for jwt token |
