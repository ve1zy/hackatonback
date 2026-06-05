import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProjectsModule } from './projects/projects.module';
import { ProjectMembersModule } from './project-members/project-members.module';
import { BoardsModule } from './boards/boards.module';
import { ColumnsModule } from './columns/columns.module';
import { TasksModule } from './tasks/tasks.module';
import { ChatModule } from './chat/chat.module';
import { CallsModule } from './calls/calls.module';
import { RemindersModule } from './reminders/reminders.module';
import { AgentEventsModule } from './agent-events/agent-events.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_DATABASE || 'hackatonback',
      autoLoadEntities: true,
      synchronize: true, ssl: true,
    }),
    UsersModule,
    ProjectsModule,
    ProjectMembersModule,
    BoardsModule,
    ColumnsModule,
    TasksModule,
    ChatModule,
    CallsModule,
    RemindersModule,
    AgentEventsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
