# Distributed E-commerce platform

#### Distributed E-commerce platform backend using nodeJs

## Tech Stack

[![Node.js](https://img.shields.io/badge/Node.js-20.10.0-green)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-4.18.1-000000?logo=express)](LINK_TO_EXPRESS)
[![Mongoose](https://img.shields.io/badge/Mongoose-7.6.3-47A248?logo=mongoose)](LINK_TO_MONGOOSE)
[![Docker](https://img.shields.io/badge/Docker-24.0.7-2496ED?logo=docker)](LINK_TO_DOCKER)
[![Ioredis](https://img.shields.io/badge/ioredis-5.4.1-DC382D?logo=redis)](https://redis.io/)

### Installing

A step by step series of examples that tell you how to get a development environment running:

1. Clone the repository

```
git clone https://github.com/harun-rucse/ecommerce-platform.git
```

2. Copy the `.env.example` file and create two file named `.env.development` and `.env.production` in the root

`.env.development`

```
NODE_ENV=development
PORT=4000
CORS_ORIGIN=http://localhost:3000

DATABASE_URL=mongodb+srv://harun:tYJ58j13pDdn64Bc@cluster0.bd818dz.mongodb.net/ecommerce-platform
DEFAULT_PRODUCT_IMAGE=https://res.cloudinary.com/harun-rucse/image/upload/v1679509832/products/default-product.png
DEFAULT_CATEGORY_IMAGE=https://res.cloudinary.com/harun-rucse/image/upload/v1679509376/categories/default-icon.png

REDIS_HOST=redis
REDIS_PORT=6379
REDIS_KEY=total-traffic
```

`.env.production`

```
NODE_ENV=production
PORT=4000
CORS_ORIGIN=http://localhost:3000

DATABASE_URL=mongodb+srv://harun:tYJ58j13pDdn64Bc@cluster0.bd818dz.mongodb.net/ecommerce-platform
DEFAULT_PRODUCT_IMAGE=https://res.cloudinary.com/harun-rucse/image/upload/v1679509832/products/default-product.png
DEFAULT_CATEGORY_IMAGE=https://res.cloudinary.com/harun-rucse/image/upload/v1679509376/categories/default-icon.png

REDIS_HOST=redis
REDIS_PORT=6379
REDIS_KEY=total-traffic
```

3. Install the dependencies

```
yarn
```

4. Start the development server

```
yarn dev
```

## Run Docker in development

```
docker-compose -f docker-compose.dev.yml up -d --build
```

## Run Docker in production

```
docker-compose -f docker-compose.prod.yml up -d --build
```

### API documentation link: https://documenter.getpostman.com/view/11943934/2sA3QpAYU3

## Built With

- [Node.js](https://nodejs.org/) - The JavaScript runtime used on the back-end
- [MongoDB](https://www.mongodb.com/) - The database used to store data
- [Express](https://expressjs.com/) - The back-end web framework used to build the API
