import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Call } from './call.entity';
import { CallParticipant } from './call-participant.entity';
import { CallActionItem } from './call-action-item.entity';
import { CreateCallDto } from './dto/create-call.dto';

@Injectable()
export class CallsService {
  constructor(
    @InjectRepository(Call)
    private callRepository: Repository<Call>,
    @InjectRepository(CallParticipant)
    private callParticipantRepository: Repository<CallParticipant>,
    @InjectRepository(CallActionItem)
    private callActionItemRepository: Repository<CallActionItem>,
  ) {}

  async create(createCallDto: CreateCallDto): Promise<Call> {
    const call = this.callRepository.create(createCallDto);
    return await this.callRepository.save(call);
  }

  async findByProject(projectId: string): Promise<Call[]> {
    return await this.callRepository.find({
      where: { projectId },
      relations: { participants: true, actionItems: true },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Call> {
    const call = await this.callRepository.findOne({
      where: { id },
      relations: { participants: true, actionItems: true },
    });
    if (!call) {
      throw new NotFoundException(`Call with ID ${id} not found`);
    }
    return call;
  }

  async addParticipant(callId: string, userId: string): Promise<CallParticipant> {
    const participant = this.callParticipantRepository.create({ callId, userId, joinedAt: new Date() });
    return await this.callParticipantRepository.save(participant);
  }

  async addActionItem(callId: string, rawText: string, taskId?: string): Promise<CallActionItem> {
    const actionItem = this.callActionItemRepository.create({ callId, rawText, taskId });
    return await this.callActionItemRepository.save(actionItem);
  }

  async updateTranscript(id: string, transcript: string, summary: string): Promise<Call> {
    await this.callRepository.update(id, { transcript, summary });
    return this.findOne(id);
  }
}