import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { Task } from './task.entity';
import { User } from '../users/user.entity';

@Entity('task_comments')
export class TaskComment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'task_id' })
  taskId: string;

  @Column({ name: 'user_id', nullable: true })
  userId: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ name: 'from_agent', default: false })
  fromAgent: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ManyToOne(() => Task, task => task.comments)
  task: Task;

  @ManyToOne(() => User, user => user.taskComments)
  user: User;
}