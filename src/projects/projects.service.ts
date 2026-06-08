import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Project } from './project.entity';
import { Board } from '../boards/board.entity';
import { ColumnEntity } from '../columns/column.entity';
import { Task } from '../tasks/task.entity';
import { ProjectMember } from '../project-members/project-member.entity';
import { ChatMessage } from '../chat/chat-message.entity';
import { Call } from '../calls/call.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
    @InjectRepository(Board)
    private boardRepository: Repository<Board>,
    @InjectRepository(ColumnEntity)
    private columnRepository: Repository<ColumnEntity>,
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    @InjectRepository(ProjectMember)
    private projectMemberRepository: Repository<ProjectMember>,
    @InjectRepository(ChatMessage)
    private chatMessageRepository: Repository<ChatMessage>,
    @InjectRepository(Call)
    private callRepository: Repository<Call>,
  ) {}

  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    const project = this.projectRepository.create(createProjectDto);
    const savedProject = await this.projectRepository.save(project);

    // Auto-create board with default columns
    const board = this.boardRepository.create({
      projectId: savedProject.id,
      name: 'Main Board',
    });
    const savedBoard = await this.boardRepository.save(board);

    // Create default columns
    const defaultColumns = [
      {
        boardId: savedBoard.id,
        name: 'Backlog',
        position: 0,
        color: '#6B7280',
      },
      {
        boardId: savedBoard.id,
        name: 'In Progress',
        position: 1,
        color: '#3B82F6',
      },
      { boardId: savedBoard.id, name: 'Done', position: 2, color: '#10B981' },
    ];

    await this.columnRepository.save(defaultColumns);

    return savedProject;
  }

  async findAll(): Promise<Project[]> {
    return await this.projectRepository.find({
      relations: { user: true },
    });
  }

  async findOne(id: string): Promise<Project> {
    const project = await this.projectRepository.findOne({
      where: { id },
      relations: { user: true, members: true, boards: true },
    });
    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
    return project;
  }

  async getProjectDashboard(id: string): Promise<any> {
    const project = await this.projectRepository.findOne({
      where: { id },
    });
    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }

    // Get columns and tasks - avoid joins by loading boards first
    const boards = await this.boardRepository.find({
      where: { projectId: String(id) },
    });
    const boardIds = boards.map((b) => String(b.id));

    const columns =
      boardIds.length > 0
        ? await this.columnRepository.find({
            where: { boardId: In(boardIds) },
          })
        : [];

    const tasks =
      boardIds.length > 0
        ? await this.taskRepository.find({
            where: { boardId: In(boardIds) },
          })
        : [];

    // Join columns to tasks manually
    if (tasks.length > 0 && columns.length > 0) {
      const columnMap = new Map(columns.map((c) => [c.id, c]));
      tasks.forEach((task) => {
        (task as Task & { column: ColumnEntity | null }).column =
          columnMap.get(task.columnId) || null;
      });
    }

    // Get chat messages
    const chatMessages = await this.chatMessageRepository.find({
      where: { projectId: String(id) },
      order: { sentAt: 'DESC' },
      take: 100,
    });

    // Get calls
    const calls = await this.callRepository.find({
      where: { projectId: String(id) },
      order: { createdAt: 'DESC' },
    });

    // Get members separately
    const members = await this.projectMemberRepository.find({
      where: { projectId: String(id) },
    });

    return {
      project: { ...project, members },
      columns,
      tasks,
      chatMessages,
      calls,
    };
  }

  async update(
    id: string,
    updateProjectDto: UpdateProjectDto,
  ): Promise<Project> {
    await this.projectRepository.update(id, updateProjectDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.projectRepository.delete(id);
  }

  async findByUserId(userId: string): Promise<Project[]> {
    const members = await this.projectMemberRepository.find({
      where: { userId },
      relations: { project: true },
    });
    return members.map((m) => m.project);
  }
}
