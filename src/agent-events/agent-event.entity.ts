import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Project } from '../projects/project.entity';

@Entity('agent_events')
export class AgentEvent {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'project_id', nullable: true })
  projectId: string;

  @Column({ name: 'event_type', nullable: true })
  eventType: 'task_created' | 'reminder_sent' | 'task_closed' | 'mention_sent';

  @Column({ type: 'text', nullable: true })
  payload: Record<string, any>;

  @Column({ nullable: true })
  status: 'success' | 'failed' | 'pending';

  @Column({ name: 'error_message', nullable: true })
  errorMessage: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ManyToOne(() => Project, (project) => project.agentEvents)
  project: Project;
}
