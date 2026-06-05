import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { ProjectMember } from '../project-members/project-member.entity';
import { ChatMessage } from '../chat/chat-message.entity';
import { Task } from '../tasks/task.entity';
import { TaskComment } from '../tasks/task-comment.entity';
import { Reminder } from '../reminders/reminder.entity';
import { CallParticipant } from '../calls/call-participant.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ name: 'full_name', nullable: true })
  fullName: string;

  @Column({ unique: true })
  email: string;

  @Column({ name: 'avatar_url', nullable: true })
  avatarUrl: string;

  @Column({ name: 'chat_platform_id', nullable: true })
  chatPlatformId: string;

  @Column({ name: 'timezone', nullable: true })
  timezone: string;

  @Column({ name: 'position', nullable: true })
  position: string;

  @Column({ name: 'phone', nullable: true })
  phone: string;

  @Column({ name: 'telegram', nullable: true })
  telegram: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @OneToMany(() => ProjectMember, member => member.user)
  projectMembers: ProjectMember[];

  @OneToMany(() => ChatMessage, message => message.user)
  chatMessages: ChatMessage[];

  @OneToMany(() => Task, task => task.assignee)
  assignedTasks: Task[];

  @OneToMany(() => Task, task => task.createdBy)
  createdTasks: Task[];

  @OneToMany(() => TaskComment, comment => comment.user)
  taskComments: TaskComment[];

  @OneToMany(() => Reminder, reminder => reminder.user)
  reminders: Reminder[];

  @OneToMany(() => CallParticipant, participant => participant.user)
  callParticipants: CallParticipant[];
}