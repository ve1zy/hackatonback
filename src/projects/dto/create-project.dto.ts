import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  chatInviteLink?: string;

  @IsString()
  @IsNotEmpty()
  createdBy: string;
}

export class CreateProjectWithInviteDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsNotEmpty()
  chatInviteLink: string;

  @IsString()
  @IsNotEmpty()
  createdBy: string;
}