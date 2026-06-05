import { IsString, IsNotEmpty } from 'class-validator';

export class CreateBoardDto {
  @IsString()
  @IsNotEmpty()
  projectId: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}