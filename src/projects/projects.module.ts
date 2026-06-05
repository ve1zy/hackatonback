import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './project.entity';
import { Board } from '../boards/board.entity';
import { ColumnEntity } from '../columns/column.entity';
import { Task } from '../tasks/task.entity';
import { ProjectMember } from '../project-members/project-member.entity';
import { ChatMessage } from '../chat/chat-message.entity';
import { Call } from '../calls/call.entity';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Project, Board, ColumnEntity, Task, ProjectMember, ChatMessage, Call])],
  providers: [ProjectsService],
  controllers: [ProjectsController],
  exports: [ProjectsService],
})
export class ProjectsModule {}