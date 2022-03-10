import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  BaseEntity,
} from 'typeorm';
import { Message } from '@persistence/chat/message/message.entity';

@Entity({ name: 'dialogs' })
export class Dialog extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  authorId: number;

  @Column('int')
  targetId: number;

  @OneToOne(() => Message, (message) => message.id)
  @JoinColumn({ name: 'id' })
  lastMessge: number;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updated_at: Date;
}
