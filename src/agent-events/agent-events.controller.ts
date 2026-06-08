import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { AgentEventsService } from './agent-events.service';
import { CreateAgentEventDto } from './dto/create-agent-event.dto';

@Controller('agent-events')
export class AgentEventsController {
  constructor(private readonly agentEventsService: AgentEventsService) {}

  @Post()
  create(@Body() createAgentEventDto: CreateAgentEventDto) {
    return this.agentEventsService.create(createAgentEventDto);
  }

  @Get()
  findByProject(@Query('projectId') projectId: string) {
    return this.agentEventsService.findByProject(projectId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.agentEventsService.findOne(id);
  }
}
