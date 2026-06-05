import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { Project } from '../projects/project.entity';
import { CallParticipant } from './call-participant.entity';
import { CallActionItem } from './call-action-item.entity';

@Entity('calls')
export class Call {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'project_id' })
  projectId: string;

  @Column()
  platform: 'telemost' | 'zoom' | 'meet';

  @Column({ name: 'meeting_url', nullable: true })
  meetingUrl: string;

  @Column()
  title: string;

  @Column({ name: 'started_at', nullable: true })
  startedAt: Date;

  @Column({ name: 'ended_at', nullable: true })
  endedAt: Date;

  @Column({ type: 'text', nullable: true })
  transcript: string;

  @Column({ type: 'text', nullable: true })
  summary: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ManyToOne(() => Project, project => project.calls)
  project: Project;

  @OneToMany(() => CallParticipant, participant => participant.call)
  participants: CallParticipant[];

  @OneToMany(() => CallActionItem, item => item.call)
  actionItems: CallActionItem[];
}