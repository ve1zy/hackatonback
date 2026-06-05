import { Controller, Get, Post, Body, Param, Query, Patch } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatMessageDto } from './dto/create-chat-message.dto';

@Controller('chat-messages')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  create(@Body() createChatMessageDto: CreateChatMessageDto) {
    return this.chatService.create(createChatMessageDto);
  }

  @Get()
  findByProject(@Query('projectId') projectId: string) {
    return this.chatService.findByProject(projectId);
  }

  @Patch(':id/process')
  markAsProcessed(@Param('id') id: string) {
    return this.chatService.markAsProcessed(id);
  }
}