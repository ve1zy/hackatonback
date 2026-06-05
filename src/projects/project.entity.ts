import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../users/user.entity';
import { ProjectMember } from '../project-members/project-member.entity';
import { Board } from '../boards/board.entity';
import { ChatMessage } from '../chat/chat-message.entity';
import { Call } from '../calls/call.entity';
import { AgentEvent } from '../agent-events/agent-event.entity';

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ name: 'created_by' })
  createdBy: string;

  @Column({ name: 'chat_invite_link', nullable: true })
  chatInviteLink: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ManyToOne(() => User, user => user.id)
  user: User;

  @OneToMany(() => ProjectMember, member => member.project)
  members: ProjectMember[];

  @OneToMany(() => Board, board => board.project)
  boards: Board[];

  @OneToMany(() => ChatMessage, message => message.project)
  chatMessages: ChatMessage[];

  @OneToMany(() => Call, call => call.project)
  calls: Call[];

  @OneToMany(() => AgentEvent, event => event.project)
  agentEvents: AgentEvent[];
}