# prisma-client

## Schema Naming

To figure out a good name for your schema consider the following; if your project is called `My Cool Project` a good
name for the schema would be `my_cool_project` for `production` and `my_cool_product_dev` for `develeopement`.

## Setup

Follow these steps to set up the `prisma-client` (all commands should be run from the project root):

-   Create your baseline schema in [schema.sql](./prisma/schema.sql)
-   Set the `DATABASE_URL` in [.env](../../.env) to resolve to your database
-   Connect to the database and apply your schema using the following commands:

```shell
# Removes schema if it exists
psql "<DATABASE_URL>" --command "DROP SCHEMA IF EXISTS <SCHEMA> CASCADE"

# Create the schema
psql "<DATABASE_URL>" --command "CREATE SCHEMA IF NOT EXISTS <SCHEMA>"

# Apply schema.sql file to database
# Any errors will cause a failure and rollback. Fix and try again
psql "<DATABASE_URL>" --single-transaction --file ./packages/prisma-client/prisma/schema.sql

# Notify prisma of the changes
prisma db pull --schema=./packages/prisma-client/prisma/schema.prisma --force

# Update the schema.prisma file to reflect your database
prisma generate --schema=./packages/prisma-client/prisma/schema.prisma
```

-   Create a baseline migration using the following commands:

```shell
# Create the migration folder
mkdir -p ./packages/prisma-client/prisma/migrations/0_init

# Create the baseline migration
prisma migrate diff \
    --from-empty \
    --to-schema-datamodel ./packages/prisma-client/prisma/schema.prisma \
    --script > ./packages/prisma-client/prisma/migrations/0_init/migration.sql

# Mark the migration as applied
prisma migrate resolve --applied 0_init --schema=./packages/prisma-client/prisma/schema.prisma
```

The client is now ready to be [built](#building) and used by the backend.

## Building

Run `nx build prisma-client` to build the library.

## Links

https://medium.com/swlh/nx-model-with-prisma-68ad1bf90379
https://hashnode.com/@SabinAdams
https://sabinadams.hashnode.dev/nx-prisma-generator
