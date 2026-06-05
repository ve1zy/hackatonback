<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

Backend API for project management system with tasks, chat, calls and reminders.

## API Endpoints

### Projects
- `GET /projects` - Get all projects
- `GET /projects/:id` - Get project by ID
- `GET /projects/:id/dashboard` - Get project dashboard (tasks, chat, calls)
- `POST /projects` - Create project (auto-creates board with default columns)
- `PATCH /projects/:id` - Update project
- `DELETE /projects/:id` - Delete project

### Users
- `GET /users` - Get all users
- `GET /users/:id` - Get user by ID
- `GET /users/by-email?email=` - Get user by email
- `POST /users` - Create user

### Project Members
- `GET /project-members?projectId=` - Get members by project
- `GET /project-members/by-user?userId=` - Get projects by user
- `POST /project-members` - Add member to project
- `DELETE /project-members/:id` - Remove member

### Boards
- `GET /boards?projectId=` - Get boards by project
- `GET /boards/:id` - Get board by ID
- `POST /boards` - Create board
- `DELETE /boards/:id` - Delete board

### Columns
- `GET /columns?boardId=` - Get columns by board
- `GET /columns/:id` - Get column by ID
- `POST /columns` - Create column
- `DELETE /columns/:id` - Delete column

### Tasks
- `GET /tasks?projectId=` - Get tasks by project
- `GET /tasks/board/:boardId` - Get tasks by board
- `GET /tasks/:id` - Get task by ID
- `POST /tasks` - Create task
- `PATCH /tasks/:id` - Update task
- `DELETE /tasks/:id` - Delete task
- `POST /tasks/:id/tags` - Add tag to task
- `POST /tasks/:id/comments` - Add comment to task

### Chat Messages
- `GET /chat-messages?projectId=` - Get messages by project
- `POST /chat-messages` - Create message
- `PATCH /chat-messages/:id/process` - Mark message as processed by agent

### Calls
- `GET /calls?projectId=` - Get calls by project
- `GET /calls/:id` - Get call by ID
- `POST /calls` - Create call
- `PATCH /calls/:id/transcript` - Update transcript and summary
- `POST /calls/:id/participants` - Add participant to call
- `POST /calls/:id/action-items` - Add action item from call

### Reminders
- `GET /reminders?projectId=` - Get reminders by project
- `POST /reminders` - Create reminder
- `PATCH /reminders/:id/send` - Mark reminder as sent

### Agent Events
- `GET /agent-events?projectId=` - Get events by project
- `GET /agent-events/:id` - Get event by ID
- `POST /agent-events` - Create event

## Environment Variables

```
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=hackatonback
```

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
