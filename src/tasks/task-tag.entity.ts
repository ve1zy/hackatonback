import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Task } from './task.entity';

@Entity('task_tags')
export class TaskTag {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'task_id', nullable: true })
  taskId: string;

  @Column({ nullable: true })
  tag: string;

  @ManyToOne(() => Task, (task) => task.tags)
  task: Task;
}
