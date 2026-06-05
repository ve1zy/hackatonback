import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from './board.entity';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private boardRepository: Repository<Board>,
  ) {}

  async create(createBoardDto: CreateBoardDto): Promise<Board> {
    const board = this.boardRepository.create(createBoardDto);
    return await this.boardRepository.save(board);
  }

  async findByProject(projectId: string): Promise<Board[]> {
    return await this.boardRepository.find({
      where: { projectId },
      relations: { columns: true },
    });
  }

  async findOne(id: string): Promise<Board> {
    const board = await this.boardRepository.findOne({
      where: { id },
      relations: { columns: true, project: true },
    });
    if (!board) {
      throw new NotFoundException(`Board with ID ${id} not found`);
    }
    return board;
  }

  async remove(id: string): Promise<void> {
    await this.boardRepository.delete(id);
  }
}