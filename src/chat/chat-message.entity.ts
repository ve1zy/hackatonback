import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Project } from '../projects/project.entity';
import { User } from '../users/user.entity';

@Entity('chat_messages')
export class ChatMessage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

@Column({ name: 'project_id', nullable: true })
  projectId: string;

  @Column({ type: 'text', nullable: true })
  content: string;

  @Column({ name: 'platform_message_id', nullable: true })
  platformMessageId: string;

  @Column({ name: 'processed_by_agent', default: false })
  processedByAgent: boolean;

  @CreateDateColumn({ name: 'sent_at' })
  sentAt: Date;

  @ManyToOne(() => Project, (project) => project.chatMessages)
  @JoinColumn({ name: 'project_id' })
  project: Project;

  @ManyToOne(() => User, (user) => user.chatMessages)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
