<h1 align="center" id="title">Outvio Nest App</h1>

![app-preview](https://i.imgur.com/KqBPJWc.png)

<p id="description">You can access the Swagger documentation at <a href="http://localhost:3003/api" target="_blank"> http://localhost:3003/api</a> after installing and starting the project. </p>

<h2>🚀 Technologies</h2>

Here're some of the used tecnologies:

- Typescript
- NestJS
- PrismaORM
- Mongo
- Redis
- Docker
- Jest
- Swagger
- ESLint

<h2>🧐 Features</h2>

Here're some of the features:

- NestJS application with Prisma ORM for database interactions.
- Mongo database initialized as service.
- Redis database used for rate limit storing.
- Dockerized application services for easy deployment.
- Authentication module with Passport JWT for authentication with token.
- CRUD operations for managing private and public data.
- Rate Limite module for ip and token rate limiting.
- All services covered by unit test by using Jest.
- API documentation using Swagger.
- ESLint and Prettier configurations for code formatting.

<h2>🧾 Prerequisites</h2>

Before you begin, ensure you have met the following requirements:

- Node.js installed (version ^16.0.0)
- Docker installed
- Set environment folder and files

<h2>🛠️ Standalone Installation:</h2>

<p>1. Clone the repository:</p>

```
git clone https://github.com/enescloud/outvio-nest-app.git
```

<p>2. Install Project</p>

```
yarn install
```

<p>3. Set Environment Files</p>

```
mv env1.example .env
```

```
mkdir env
```

```
mv env2.example env/.env.dev
```

<p>4. Give Permissons To  Our Script File</p>

```
chmod +x scripts/init-all-services.sh
```

<p>5. Build and Initialize All Services(Redis, Mongo)</p>

```
./scripts/init-all-services.sh
```

<p>6. Run Tests</p>

```
yarn test
```

<p>7. Start Application</p>

```
yarn start:debug
```

<h2>📝 Notes</h2>

<p>You can use <b>Prisma Stuido</b> for checking data on UI</p>

```
npx prisma studio
```

<p>You can use <b>Redis CLI</b> for checking data on cli</p>

```
docker exec -it redis redis-cli
```

```
KEYS *
```

<p>You can use <b>Redis CLI</b> for checking data on cli</p>

<p<b>Concurrency Note:</b> In the project, Node.js's robust event loop and Redis's <b>"Fixed Window"</b> algorithm have been harnessed to ensure the safe and efficient handling of concurrent operations. Node.js's event-driven architecture facilitates the management of multiple operations happening simultaneously, while Redis's Fixed Window mechanism controls the rate at which requests are permitted, preventing overloading of shared resources. This combination effectively safeguards against concurrency issues, ensuring data integrity and resource protection.</p>
