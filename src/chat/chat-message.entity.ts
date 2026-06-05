import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { Project } from '../projects/project.entity';
import { User } from '../users/user.entity';

@Entity('chat_messages')
export class ChatMessage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'project_id' })
  projectId: string;

  @Column({ name: 'user_id', nullable: true })
  userId: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ name: 'platform_message_id', nullable: true })
  platformMessageId: string;

  @Column({ name: 'processed_by_agent', default: false })
  processedByAgent: boolean;

  @CreateDateColumn({ name: 'sent_at' })
  sentAt: Date;

  @ManyToOne(() => Project, project => project.chatMessages)
  project: Project;

  @ManyToOne(() => User, user => user.chatMessages)
  user: User;
}