import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Call } from './call.entity';
import { User } from '../users/user.entity';

@Entity('call_participants')
export class CallParticipant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'call_id' })
  callId: string;

  @Column({ name: 'user_id' })
  userId: string;

  @Column({ name: 'joined_at', nullable: true })
  joinedAt: Date;

  @Column({ name: 'left_at', nullable: true })
  leftAt: Date;

  @ManyToOne(() => Call, call => call.participants)
  call: Call;

  @ManyToOne(() => User, user => user.callParticipants)
  user: User;
}