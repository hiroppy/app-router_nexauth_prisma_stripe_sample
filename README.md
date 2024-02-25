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

## Test

Test uses also DB so need to start DB first.

```sh
# unit tests

# run the DB and generate the client
$ pnpm test:db:setup
# execute
$ pnpm test
# watch the unit tests
$ pnpm test:watch
# reset the DB
$ pnpm test:db:reset

# e2e

# install chrome
$ pnpm exec playwright install chrome
# run the DB and generate the client
$ pnpm test:db:setup
# test uses a built app since next.js has different cache behavior between development and production
$ pnpm build
# execute
$ pnpm test:e2e
```

💁‍♀️ This template recommends using a real database but when you face not keeping idempotency, you might consider using mock.
