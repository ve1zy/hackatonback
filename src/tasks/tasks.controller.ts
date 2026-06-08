import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  findByProject(@Query('projectId') projectId: string) {
    return this.tasksService.findByProject(projectId);
  }

  @Get('board/:boardId')
  findByBoard(@Param('boardId') boardId: string) {
    return this.tasksService.findByBoard(boardId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.remove(id);
  }

  @Post(':id/tags')
  addTag(@Param('id') taskId: string, @Body('tag') tag: string) {
    return this.tasksService.addTag(taskId, tag);
  }

  @Post(':id/comments')
  addComment(
    @Param('id') taskId: string,
    @Body('userId') userId: string,
    @Body('content') content: string,
    @Body('fromAgent') fromAgent?: boolean,
  ) {
    return this.tasksService.addComment(taskId, userId, content, fromAgent);
  }
}
