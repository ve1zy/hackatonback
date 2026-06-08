import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskTag } from './task-tag.entity';
import { TaskComment } from './task-comment.entity';
import { Board } from '../boards/board.entity';
import { ColumnEntity } from '../columns/column.entity';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task, TaskTag, TaskComment, Board, ColumnEntity]),
  ],
  providers: [TasksService],
  controllers: [TasksController],
  exports: [TasksService],
})
export class TasksModule {}
