import { Controller, Get, Post, Body, Param, Query, Patch } from '@nestjs/common';
import { RemindersService } from './reminders.service';
import { CreateReminderDto } from './dto/create-reminder.dto';

@Controller('reminders')
export class RemindersController {
  constructor(private readonly remindersService: RemindersService) {}

  @Post()
  create(@Body() createReminderDto: CreateReminderDto) {
    return this.remindersService.create(createReminderDto);
  }

  @Get()
  findByProject(@Query('projectId') projectId: string) {
    if (projectId) {
      return this.remindersService.findByProject(projectId);
    }
    return [];
  }

  @Patch(':id/send')
  markAsSent(@Param('id') id: string) {
    return this.remindersService.markAsSent(id);
  }
}