This sample shows how to handle Stripe payments using NextAuth and Prisma based on Next.js's app router.

Dummy cards: https://docs.stripe.com/testing

## Setup

**Installing Docker Compose**

Please check [Installation scenarios](https://docs.docker.com/compose/install/) section.

**Enabling git hook and corepack**

```sh
$ npm run setup
```

**Installing Deps**

```sh
$ pnpm i
```

**Creating `.env.local` and modifying env**

```sh
$ cp .env.sample .env.local
```

If you use Google OAuth, you need to set `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`, if not, you can remove a provider from `_clients/NextAuth.ts`. And NextAuth requires `NEXTAUTH_SECRET` token so please generate using OpenSSL.

## Dev

```sh
# start docker-compose, migrations(generating the client), and next dev
$ pnpm dev
# create new migration
$ pnpm dev:db:migrate
# reset the DB
$ pnpm dev:db:reset
# view the contents
$ pnpm dev:db:studio
```
