
# Dockerized Application with Neon Database

This project demonstrates how to dockerize a Node.js application using Neon Database, with separate configurations for development and production environments.

## Table of Contents
- [Development Setup (Neon Local)](#development-setup-neon-local)
- [Production Setup (Neon Cloud)](#production-setup-neon-cloud)

## Development Setup (Neon Local)

For local development, the application is configured to use **Neon Local**, which runs a PostgreSQL proxy in a Docker container alongside your application. This allows for automatic creation of ephemeral branches for development and testing.

### Prerequisites
- Docker and Docker Compose installed.

### 1. Configure Environment Variables

Create a `development.env` file in the root of your project with the following content:

```
DATABASE_URL=postgres://user:password@neon-local:5432/dbname
```

**Note**: Replace `user`, `password`, and `dbname` with your desired local credentials.

### 2. Start the Application

To start the application and Neon Local in development mode, use Docker Compose:

```bash
docker compose -f docker-compose.dev.yml up --build
```

This command will:
- Build your application's Docker image.
- Start the `neon-local` service, which acts as a local PostgreSQL proxy.
- Start your application, connecting to `neon-local`.

Your application will be accessible at `http://localhost:8080`.

## Production Setup (Neon Cloud)

For the production environment, the application connects directly to a **Neon Cloud Database** instance. Neon Local is not used in production.

### Prerequisites
- A Neon Cloud account and a provisioned database.
- Docker and Docker Compose installed.

### 1. Configure Environment Variables

Create a `production.env` file in the root of your project. This file will contain your actual Neon Cloud database URL and any other production-specific environment variables.

```
DATABASE_URL=postgres://[user]:[password]@[neon_hostname]/[dbname]?sslmode=require
```

**Note**: Replace `[user]`, `[password]`, `[neon_hostname]`, and `[dbname]` with your actual Neon Cloud database credentials.

### 2. Start the Application

To start the application in production mode, use Docker Compose:

```bash
docker compose -f docker-compose.prod.yml up --build
```

This command will:
- Build your application's Docker image.
- Start your application, connecting to your Neon Cloud database using the `DATABASE_URL` from `production.env`.

