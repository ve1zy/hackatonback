import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { Task } from '../tasks/task.entity';
import { User } from '../users/user.entity';

@Entity('reminders')
export class Reminder {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'task_id' })
  taskId: string;

  @Column({ name: 'user_id' })
  userId: string;

  @Column()
  type: 'due_soon' | 'overdue' | 'mention';

  @Column()
  channel: 'chat' | 'email';

  @Column({ default: false })
  sent: boolean;

  @Column({ name: 'remind_at' })
  remindAt: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ManyToOne(() => Task, task => task.reminders)
  task: Task;

  @ManyToOne(() => User, user => user.reminders)
  user: User;
}