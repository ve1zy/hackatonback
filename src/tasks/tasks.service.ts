import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Task } from './task.entity';
import { TaskTag } from './task-tag.entity';
import { TaskComment } from './task-comment.entity';
import { Board } from '../boards/board.entity';
import { ColumnEntity } from '../columns/column.entity';
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
    @InjectRepository(Board)
    private boardRepository: Repository<Board>,
    @InjectRepository(ColumnEntity)
    private columnRepository: Repository<ColumnEntity>,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const { projectId, columnName, columnId, ...rest } = createTaskDto;

    // Get the main board for this project - without relations to avoid type issues
    const boards = await this.boardRepository.find({
      where: { projectId: String(projectId) },
    });

    const board = boards[0];
    if (!board) {
      throw new NotFoundException(`Board for project ${projectId} not found`);
    }

    // Get columns for this board
    const columns = await this.columnRepository.find({
      where: { boardId: String(board.id) },
    });

    // Find column ID - either by provided columnId (UUID) or columnName (e.g., "backlog")
    let resolvedColumnId = columnId;
    if (columnName && !resolvedColumnId) {
      const normalizedColumnName = columnName.toLowerCase().replace(' ', '-');
      const column = columns?.find(
        (c) =>
          c.name.toLowerCase().replace(' ', '-') === normalizedColumnName ||
          c.name.toLowerCase() === columnName.toLowerCase(),
      );
      if (column) {
        resolvedColumnId = column.id;
      }
    }

    if (!resolvedColumnId) {
      throw new NotFoundException(
        `Column not found. Available: ${columns?.map((c) => c.name).join(', ')}`,
      );
    }

    const task = this.taskRepository.create({
      ...rest,
      boardId: board.id,
      columnId: resolvedColumnId,
    });
    return await this.taskRepository.save(task);
  }

  async findByProject(projectId: string): Promise<Task[]> {
    const boards = await this.boardRepository.find({
      where: { projectId: String(projectId) },
    });
    const boardIds = boards.map((b) => String(b.id));
    if (boardIds.length === 0) return [];
    return await this.taskRepository.find({
      where: { boardId: In(boardIds) },
    });
  }

  async findByBoard(boardId: string): Promise<Task[]> {
    return await this.taskRepository.find({
      where: { boardId: String(boardId) },
    });
  }

  async findOne(id: string): Promise<Task> {
    const task = await this.taskRepository.findOne({
      where: { id },
    });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const { columnName, ...rest } = updateTaskDto;
    let updateData = rest;

    // If columnName is provided, resolve it to columnId
    if (columnName) {
      const task = await this.taskRepository.findOne({ where: { id } });
      if (task) {
        const columns = await this.columnRepository.find({
          where: { boardId: String(task.boardId) },
        });
        const normalizedColumnName = columnName.toLowerCase().replace(' ', '-');
        const column = columns.find(
          (c) =>
            c.name.toLowerCase().replace(' ', '-') === normalizedColumnName ||
            c.name.toLowerCase() === columnName.toLowerCase(),
        );
        if (column) {
          updateData = { ...updateData, columnId: column.id };
        }
      }
    }

    if (updateTaskDto.completed) {
      await this.taskRepository.update(id, { completedAt: new Date() });
    }
    await this.taskRepository.update(id, updateData);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.taskRepository.delete(id);
  }

  async addTag(taskId: string, tag: string): Promise<TaskTag> {
    const taskTag = this.taskTagRepository.create({ taskId, tag });
    return await this.taskTagRepository.save(taskTag);
  }

  async addComment(
    taskId: string,
    userId: string,
    content: string,
    fromAgent = false,
  ): Promise<TaskComment> {
    const comment = this.taskCommentRepository.create({
      taskId,
      userId,
      content,
      fromAgent,
    });
    return await this.taskCommentRepository.save(comment);
  }
}
