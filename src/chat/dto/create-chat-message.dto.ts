import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateChatMessageDto {
  @IsString()
  @IsNotEmpty()
  projectId: string;

  @IsString()
  @IsOptional()
  userId?: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  @IsOptional()
  platformMessageId?: string;
}