import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatMessage } from './chat-message.entity';
import { CreateChatMessageDto } from './dto/create-chat-message.dto';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(ChatMessage)
    private chatMessageRepository: Repository<ChatMessage>,
  ) {}

  async create(
    createChatMessageDto: CreateChatMessageDto,
  ): Promise<ChatMessage> {
    const message = this.chatMessageRepository.create(createChatMessageDto);
    return await this.chatMessageRepository.save(message);
  }

  async findByProject(projectId: string): Promise<ChatMessage[]> {
    return await this.chatMessageRepository.find({
      where: { projectId: String(projectId) },
      relations: { user: true },
      order: { sentAt: 'DESC' },
    });
  }

  async markAsProcessed(id: string): Promise<ChatMessage> {
    await this.chatMessageRepository.update(id, { processedByAgent: true });
    const message = await this.chatMessageRepository.findOne({ where: { id } });
    if (!message) {
      throw new NotFoundException(`Chat message with ID ${id} not found`);
    }
    return message;
  }
}
