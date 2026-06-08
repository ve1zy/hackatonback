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
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true,
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
