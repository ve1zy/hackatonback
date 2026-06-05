import { Controller, Get, Post, Body, Delete, Query, Param } from '@nestjs/common';
import { ProjectMembersService } from './project-members.service';
import { CreateProjectMemberDto } from './dto/create-project-member.dto';

@Controller('project-members')
export class ProjectMembersController {
  constructor(private readonly projectMembersService: ProjectMembersService) {}

  @Post()
  create(@Body() createProjectMemberDto: CreateProjectMemberDto) {
    return this.projectMembersService.create(createProjectMemberDto);
  }

  @Get()
  findByProject(@Query('projectId') projectId: string) {
    return this.projectMembersService.findByProject(projectId);
  }

  @Get('by-user')
  findByUser(@Query('userId') userId: string) {
    return this.projectMembersService.findByUser(userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectMembersService.remove(id);
  }
}