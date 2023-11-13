
# Setup
#### Open and edit or add .env file with variables bellow
```
JWT_SECRET=
DATABASE_HOST=
DATABASE_PORT=
DATABASE_USERNAME=
DATABASE_PASSWORD=
DATABASE_NAME=
PORT=
```
Great, now select the appropriate run method described bellow.

## Docker compose running 
```bash
$ docker-compose build
$ docker-compose up
```
```bash
# For desktop docker
$ docker compose build
$ docker compose up  
```

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Swagger ui
```
link: ${your_host:port}/api
```