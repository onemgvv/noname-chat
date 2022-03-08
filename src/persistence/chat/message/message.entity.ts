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
import { Dialog } from '@persistence/chat/dialog/dialog.entity';

@Entity('messages')
export class Message extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: true })
  text: string;

  @Column({ type: 'boolean', default: false })
  read: boolean;

  @Column({ type: 'int', nullable: false })
  authorId: number;

  @Column({ type: 'int', nullable: false })
  targetId: number;

  @OneToOne(() => Dialog, (dialog) => dialog.id)
  @JoinColumn({ name: 'id' })
  dialogId: number;

  @Column({ type: 'varchar', nullable: true })
  voice: string;

  @Column({ type: 'varchar', nullable: true })
  image: string;

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
