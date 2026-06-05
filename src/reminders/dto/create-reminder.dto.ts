import { IsString, IsNotEmpty, IsIn, IsDateString } from 'class-validator';

export class CreateReminderDto {
  @IsString()
  @IsNotEmpty()
  taskId: string;

  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsIn(['due_soon', 'overdue', 'mention'])
  type: 'due_soon' | 'overdue' | 'mention';

  @IsString()
  @IsIn(['chat', 'email'])
  channel: 'chat' | 'email';

  @IsDateString()
  @IsNotEmpty()
  remindAt: Date;
}