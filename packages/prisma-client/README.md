# prisma-client

## Schema Naming

To figure out a good name for your schema consider the following; if your project is called `My Cool Project` a good
name for the schema would be `my_cool_project` for `production` and `my_cool_product_dev` for `develeopement`. For the
`SHADOW_DATABASE_URL` append `_shadow` to the name of the schema. If your schema is called `my_cool_product_dev` the
`shadow` variant would be called `my_cool_product_dev_shadow`.

## Setup

Follow these steps to set up the `prisma-client` (all commands should be run from the project root):

-   Create your baseline schema in [schema.sql](./prisma/schema.sql)
-   Set the `DATABASE_URL` in [.env](../../.env) to resolve to your database
-   Set the `SHADOW_DATABASE_URL` in [.env](../../.env) to resolve to your database
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
npx prisma db pull --schema=./packages/prisma-client/prisma/schema.prisma --force

# Update the schema.prisma file to reflect your database
npx prisma generate --schema=./packages/prisma-client/prisma/schema.prisma

# Rebuild the client
nx build prisma-client
```

-   Create a baseline migration using the following commands:

```shell
# Create the migration folder
mkdir -p ./packages/prisma-client/prisma/migrations/0_init

# Create the baseline migration
npx prisma migrate diff \
    --from-empty \
    --to-schema-datamodel ./packages/prisma-client/prisma/schema.prisma \
    --script > ./packages/prisma-client/prisma/migrations/0_init/migration.sql

# Mark the migration as applied
npx prisma migrate resolve --applied 0_init --schema=./packages/prisma-client/prisma/schema.prisma

# Rebuild the client
nx build prisma-client
```

## Follow On Migrations

To create a new migration, first update the [schema.prisma](./prisma/schema.prisma) file. Then run the following command:

```shell
# Create the migration
npx prisma migrate dev --name "<NAME_OF_MIGRATION>" --schema=./packages/prisma-client/prisma/schema.prisma

# Rebuild the client
nx build prisma-client
```

It should be noted that that `NAME_OF_MIGRATION` should contain no special characters or spaces. The name should be
descriptive of the changes being made.

## Links

https://medium.com/swlh/nx-model-with-prisma-68ad1bf90379
https://hashnode.com/@SabinAdams
https://sabinadams.hashnode.dev/nx-prisma-generator
