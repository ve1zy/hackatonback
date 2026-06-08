import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectMember } from './project-member.entity';
import { CreateProjectMemberDto } from './dto/create-project-member.dto';

@Injectable()
export class ProjectMembersService {
  constructor(
    @InjectRepository(ProjectMember)
    private projectMemberRepository: Repository<ProjectMember>,
  ) {}

  async create(
    createProjectMemberDto: CreateProjectMemberDto,
  ): Promise<ProjectMember> {
    const member = this.projectMemberRepository.create(createProjectMemberDto);
    return await this.projectMemberRepository.save(member);
  }

  async findByProject(projectId: string): Promise<ProjectMember[]> {
    return await this.projectMemberRepository.find({
      where: { projectId: String(projectId) },
      relations: { user: true },
    });
  }

  async findByUser(userId: string): Promise<ProjectMember[]> {
    return await this.projectMemberRepository.find({
      where: { userId },
      relations: { project: true },
    });
  }

  async remove(id: string): Promise<void> {
    await this.projectMemberRepository.delete(id);
  }
}
