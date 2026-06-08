import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Call } from './call.entity';
import { Task } from '../tasks/task.entity';

@Entity('call_action_items')
export class CallActionItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'call_id', nullable: true })
  callId: string;

  @Column({ name: 'task_id', nullable: true })
  taskId: string;

  @Column({ type: 'text', nullable: true })
  rawText: string;

  @Column({ name: 'auto_created', default: true })
  autoCreated: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ManyToOne(() => Call, (call) => call.actionItems)
  call: Call;

  @ManyToOne(() => Task, (task) => task.actionItems)
  task: Task;
}
