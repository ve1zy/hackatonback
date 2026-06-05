import { IsString, IsNotEmpty, IsIn } from 'class-validator';

export class CreateProjectMemberDto {
  @IsString()
  @IsNotEmpty()
  projectId: string;

  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsIn(['owner', 'member', 'viewer'])
  role: 'owner' | 'member' | 'viewer';
}