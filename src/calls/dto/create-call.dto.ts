import {
  IsString,
  IsNotEmpty,
  IsIn,
  IsOptional,
  IsDateString,
} from 'class-validator';

export class CreateCallDto {
  @IsString()
  @IsNotEmpty()
  projectId: string;

  @IsString()
  @IsIn(['telemost', 'zoom', 'meet'])
  platform: 'telemost' | 'zoom' | 'meet';

  @IsString()
  @IsOptional()
  meetingUrl?: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsDateString()
  @IsOptional()
  startedAt?: Date;

  @IsDateString()
  @IsOptional()
  endedAt?: Date;
}
