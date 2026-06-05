import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateColumnDto {
  @IsString()
  @IsNotEmpty()
  boardId: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  position: number;

  @IsString()
  @IsOptional()
  color?: string;
}