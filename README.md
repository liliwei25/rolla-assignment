## Description

Rolla assignment based on [Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
$ docker-compose up
$ docker container exec rolla-api npm run migrate:deploy
```

API available at `http://localhost:3000`

## Endpoints
### User
```
POST /user/create

Creates a user with provided username and password

Params:
{
    "username": string,
    "password": string
}

Response:
{
  id: number;
  username: string;
  ethAddress: string;
  createdAt: Date;
  updatedAt: Date;
}
```
```
GET /user/profile

Retrieves user's profile

Headers:
{
    Authorization: Bearer token
}

Response:
{
    id: number;
    username: string;
    ethAddress: string;
    createdAt: Date;
    updatedAt: Date;
}
```

### Exchange
```
GET /user/balance/:token

Supported tokens: USDC, ETHEREUM

Headers:
{
    Authorization: Bearer token
}

Response:
balance: string;
```


### Auth
```
POST /auth/login

Params:
{
    "username": string,
    "password": string
}

Response:
{
    accessToken: string
}
```
