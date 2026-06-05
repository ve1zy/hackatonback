import { Controller, Get, Post, Body, Param, Query, Patch } from '@nestjs/common';
import { CallsService } from './calls.service';
import { CreateCallDto } from './dto/create-call.dto';

@Controller('calls')
export class CallsController {
  constructor(private readonly callsService: CallsService) {}

  @Post()
  create(@Body() createCallDto: CreateCallDto) {
    return this.callsService.create(createCallDto);
  }

  @Get()
  findByProject(@Query('projectId') projectId: string) {
    return this.callsService.findByProject(projectId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.callsService.findOne(id);
  }

  @Patch(':id/transcript')
  updateTranscript(
    @Param('id') id: string,
    @Body('transcript') transcript: string,
    @Body('summary') summary: string,
  ) {
    return this.callsService.updateTranscript(id, transcript, summary);
  }

  @Post(':id/participants')
  addParticipant(@Param('id') callId: string, @Body('userId') userId: string) {
    return this.callsService.addParticipant(callId, userId);
  }

  @Post(':id/action-items')
  addActionItem(
    @Param('id') callId: string,
    @Body('rawText') rawText: string,
    @Body('taskId') taskId?: string,
  ) {
    return this.callsService.addActionItem(callId, rawText, taskId);
  }
}