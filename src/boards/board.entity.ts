import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { Project } from '../projects/project.entity';
import { ColumnEntity } from '../columns/column.entity';

@Entity('boards')
export class Board {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'project_id' })
  projectId: string;

  @Column()
  name: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ManyToOne(() => Project, project => project.boards)
  project: Project;

  @OneToMany(() => ColumnEntity, column => column.board)
  columns: ColumnEntity[];
}