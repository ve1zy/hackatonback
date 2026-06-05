import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';
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

  @Column({ name: 'board_id' })
  boardId: string;

  @Column({ name: 'column_id' })
  columnId: string;

  @Column({ name: 'assignee_id', nullable: true })
  assigneeId: string;

  @Column({ name: 'created_by', nullable: true })
  createdById: string;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column()
  priority: 'low' | 'medium' | 'high' | 'critical';

  @Column({ name: 'due_date', nullable: true })
  dueDate: Date;

  @Column({ name: 'completed_at', nullable: true })
  completedAt: Date;

  @Column({ name: 'source_message_id', nullable: true })
  sourceMessageId: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => Board, board => board.id)
  board: Board;

  @ManyToOne(() => ColumnEntity, column => column.tasks)
  column: ColumnEntity;

  @ManyToOne(() => User, user => user.assignedTasks)
  assignee: User;

  @ManyToOne(() => User, user => user.createdTasks)
  createdBy: User;

  @ManyToOne(() => ChatMessage, message => message.id)
  sourceMessage: ChatMessage;

  @OneToMany(() => TaskTag, tag => tag.task)
  tags: TaskTag[];

  @OneToMany(() => TaskComment, comment => comment.task)
  comments: TaskComment[];

  @OneToMany(() => Reminder, reminder => reminder.task)
  reminders: Reminder[];

  @OneToMany(() => CallActionItem, item => item.task)
  actionItems: CallActionItem[];
}