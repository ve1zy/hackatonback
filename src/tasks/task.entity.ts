import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Board } from '../boards/board.entity';
import { ColumnEntity } from '../columns/column.entity';
import { User } from '../users/user.entity';
import { ChatMessage } from '../chat/chat-message.entity';
import { TaskTag } from './task-tag.entity';
import { TaskComment } from './task-comment.entity';
import { Reminder } from '../reminders/reminder.entity';
import { CallActionItem } from '../calls/call-action-item.entity';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'board_id', nullable: true })
  boardId: string;

  @Column({ name: 'column_id', nullable: true })
  columnId: string;

  @Column({ name: 'assignee_id', nullable: true })
  assigneeId: string;

  @Column({ name: 'created_by', nullable: true })
  createdById: string;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ default: 'medium' })
  priority: 'low' | 'medium' | 'high' | 'critical';

  @Column({ name: 'due_date', nullable: true })
  dueDate: Date;

  @Column({ name: 'completed_at', nullable: true })
  completedAt: Date;

  @Column({ name: 'source_message_id', nullable: true })
  sourceMessageId: string;

  @Column({ default: false })
  completed: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => Board, (board) => board.id)
  @JoinColumn({ name: 'board_id' })
  board: Board;

  @ManyToOne(() => ColumnEntity, (column) => column.tasks)
  @JoinColumn({ name: 'column_id' })
  column: ColumnEntity | null;

  @ManyToOne(() => User, (user) => user.assignedTasks)
  @JoinColumn({ name: 'assignee_id' })
  assignee: User;

  @ManyToOne(() => User, (user) => user.createdTasks)
  @JoinColumn({ name: 'created_by' })
  createdBy: User;

  @ManyToOne(() => ChatMessage, (message) => message.id)
  sourceMessage: ChatMessage;

  @OneToMany(() => TaskTag, (tag) => tag.task)
  tags: TaskTag[];

  @OneToMany(() => TaskComment, (comment) => comment.task)
  comments: TaskComment[];

  @OneToMany(() => Reminder, (reminder) => reminder.task)
  reminders: Reminder[];

  @OneToMany(() => CallActionItem, (item) => item.task)
  actionItems: CallActionItem[];
}
