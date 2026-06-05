import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { TaskTag } from './task-tag.entity';
import { TaskComment } from './task-comment.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    @InjectRepository(TaskTag)
    private taskTagRepository: Repository<TaskTag>,
    @InjectRepository(TaskComment)
    private taskCommentRepository: Repository<TaskComment>,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = this.taskRepository.create(createTaskDto);
    return await this.taskRepository.save(task);
  }

  async findByProject(projectId: string): Promise<Task[]> {
    return await this.taskRepository.find({
      where: { board: { projectId } },
      relations: { assignee: true, createdBy: true, column: true, tags: true, comments: true },
    });
  }

  async findByBoard(boardId: string): Promise<Task[]> {
    return await this.taskRepository.find({
      where: { boardId },
      relations: { assignee: true, createdBy: true, column: true, tags: true, comments: true },
    });
  }

  async findOne(id: string): Promise<Task> {
    const task = await this.taskRepository.findOne({
      where: { id },
      relations: { assignee: true, createdBy: true, column: true, tags: true, comments: true },
    });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    if (updateTaskDto.completed) {
      await this.taskRepository.update(id, { completedAt: new Date() });
    }
    await this.taskRepository.update(id, updateTaskDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.taskRepository.delete(id);
  }

  async addTag(taskId: string, tag: string): Promise<TaskTag> {
    const taskTag = this.taskTagRepository.create({ taskId, tag });
    return await this.taskTagRepository.save(taskTag);
  }

  async addComment(taskId: string, userId: string, content: string, fromAgent = false): Promise<TaskComment> {
    const comment = this.taskCommentRepository.create({ taskId, userId, content, fromAgent });
    return await this.taskCommentRepository.save(comment);
  }
}