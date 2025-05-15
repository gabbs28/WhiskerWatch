# Fullstack Starter Project

This is a starter monorepo project for making a fullstack web application. The backend
uses ExpressJS for the webserver, Prisma as the ORM, and PostgreSQL as the
database. The frontend uses React with Material UI.

# Setup

Set the `title` in the [index.html](apps/frontend/index.html).

Copy the [.env.sample](.env.sample) to [.env](.env). A random value needs to be set for both `CSRF_SECRET` and
`JWT_SECRET`. Set the `DATABASE_URL` to the database you are using. If using a shared database where the project should
be saved into a schema make sure to set the `schema` parameter in the connection string as shown in the example below:

```shell
DATABASE_URL="postgresql://user:password@host:port/database-name?schema=schema-name"
```

Copy the [.production.env.sample](.production.env.sample) to [.production.env](.production.env). This will allow for
cookies to be set when running both backend and frontend is `production` mode.

Install the required node modules:

```shell
npm install
```

As part of the setup process a `pre-commit` hook will be added that checks to see if files conform to the `lint` and
`prettier` standards. This helps to keep code clean and formatted.

Once the `npm install` has completed make sure to generate the `prisma-client` files using the following command:

```shell
nx run @aa-mono-repo/backend:prisma-generate
```

# Dependencies

This project has adopted the philosophy of using a single top-level [package.json](package.json) for all dependencies.
When adding any additional dependencies, make sure to install them at in the root of the project. This ensures that all
applications and packages are using the same versions.

# Commands

To check if files adhere to formating requirements, run:

```shell
nx format
```

To fix any formating issues, run:

```shell
nx format:write
```

To lint the project, run:

```shell
nx run-many -t lint --all --parallel
```

To fix any fixable lint issues, run:

```shell
nx run-many -t lint --all --parallel --fix
```

# Deployment

Use the following settings when deploying to Render.com:

## Environment Variables

Create two environment variables, one called `CSRF_SECRET` and the other `JWT_SECRET`. Use the `Generate` button to
create a random value for each.

Set the `DATABASE_URL` based on the appropriate connection string.

## Build Command

```shell
npm install &&
    nx run @aa-mono-repo/frontend:build &&
    nx run @aa-mono-repo/backend:build:production
```

## Start Command

```shell
node apps/backend/dist/server.js
```
