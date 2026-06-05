import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reminder } from './reminder.entity';
import { Task } from '../tasks/task.entity';
import { CreateReminderDto } from './dto/create-reminder.dto';

@Injectable()
export class RemindersService {
  constructor(
    @InjectRepository(Reminder)
    private reminderRepository: Repository<Reminder>,
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async create(createReminderDto: CreateReminderDto): Promise<Reminder> {
    const reminder = this.reminderRepository.create(createReminderDto);
    return await this.reminderRepository.save(reminder);
  }

  async findByUser(userId: string): Promise<Reminder[]> {
    return await this.reminderRepository.find({
      where: { userId },
      relations: { task: true },
    });
  }

  async findByTask(taskId: string): Promise<Reminder[]> {
    return await this.reminderRepository.find({
      where: { taskId },
      relations: { user: true },
    });
  }

  async findByProject(projectId: string): Promise<Reminder[]> {
    return await this.reminderRepository.find({
      where: { task: { board: { projectId } } },
      relations: { user: true, task: true },
    });
  }

  async markAsSent(id: string): Promise<Reminder> {
    await this.reminderRepository.update(id, { sent: true });
    const reminder = await this.reminderRepository.findOne({ where: { id } });
    if (!reminder) {
      throw new NotFoundException(`Reminder with ID ${id} not found`);
    }
    return reminder;
  }
}