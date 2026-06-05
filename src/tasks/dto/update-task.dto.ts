import { IsString, IsOptional, IsIn, IsDateString, IsBoolean } from 'class-validator';

export class UpdateTaskDto {
  @IsString()
  @IsOptional()
  columnId?: string;

  @IsString()
  @IsOptional()
  assigneeId?: string;

  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsIn(['low', 'medium', 'high', 'critical'])
  @IsOptional()
  priority?: 'low' | 'medium' | 'high' | 'critical';

  @IsDateString()
  @IsOptional()
  dueDate?: Date;

  @IsBoolean()
  @IsOptional()
  completed?: boolean;
}