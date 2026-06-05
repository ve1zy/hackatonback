import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AgentEvent } from './agent-event.entity';
import { CreateAgentEventDto } from './dto/create-agent-event.dto';

@Injectable()
export class AgentEventsService {
  constructor(
    @InjectRepository(AgentEvent)
    private agentEventRepository: Repository<AgentEvent>,
  ) {}

  async create(createAgentEventDto: CreateAgentEventDto): Promise<AgentEvent> {
    const event = this.agentEventRepository.create(createAgentEventDto);
    return await this.agentEventRepository.save(event);
  }

  async findByProject(projectId: string): Promise<AgentEvent[]> {
    return await this.agentEventRepository.find({
      where: { projectId },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<AgentEvent> {
    const event = await this.agentEventRepository.findOne({ where: { id } });
    if (!event) {
      throw new NotFoundException(`Agent event with ID ${id} not found`);
    }
    return event;
  }
}