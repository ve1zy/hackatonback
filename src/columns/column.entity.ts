import { Entity, PrimaryGeneratedColumn, Column as ColumnDecorator, ManyToOne, OneToMany } from 'typeorm';
import { Board } from '../boards/board.entity';
import { Task } from '../tasks/task.entity';

@Entity('columns')
export class ColumnEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ColumnDecorator({ name: 'board_id' })
  boardId: string;

  @ColumnDecorator()
  name: string;

  @ColumnDecorator()
  position: number;

  @ColumnDecorator({ nullable: true })
  color: string;

  @ManyToOne(() => Board, board => board.columns)
  board: Board;

  @OneToMany(() => Task, task => task.column)
  tasks: Task[];
}