import {
  IsString,
  IsNotEmpty,
  IsIn,
  IsOptional,
  IsObject,
} from 'class-validator';

export class CreateAgentEventDto {
  @IsString()
  @IsNotEmpty()
  projectId: string;

  @IsString()
  @IsIn(['task_created', 'reminder_sent', 'task_closed', 'mention_sent'])
  eventType: 'task_created' | 'reminder_sent' | 'task_closed' | 'mention_sent';

  @IsObject()
  @IsNotEmpty()
  payload: Record<string, any>;

  @IsString()
  @IsIn(['success', 'failed', 'pending'])
  status: 'success' | 'failed' | 'pending';

  @IsString()
  @IsOptional()
  errorMessage?: string;
}
