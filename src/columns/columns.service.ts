import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ColumnEntity } from './column.entity';
import { CreateColumnDto } from './dto/create-column.dto';

@Injectable()
export class ColumnsService {
  constructor(
    @InjectRepository(ColumnEntity)
    private columnRepository: Repository<ColumnEntity>,
  ) {}

  async create(createColumnDto: CreateColumnDto): Promise<ColumnEntity> {
    const column = this.columnRepository.create(createColumnDto);
    return await this.columnRepository.save(column);
  }

  async findByBoard(boardId: string): Promise<ColumnEntity[]> {
    return await this.columnRepository.find({
      where: { boardId },
      order: { position: 'ASC' },
    });
  }

  async findOne(id: string): Promise<ColumnEntity> {
    const column = await this.columnRepository.findOne({
      where: { id },
      relations: { board: true, tasks: true },
    });
    if (!column) {
      throw new NotFoundException(`Column with ID ${id} not found`);
    }
    return column;
  }

  async remove(id: string): Promise<void> {
    await this.columnRepository.delete(id);
  }
}