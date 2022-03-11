import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Bot } from '../bot/bot.entity';

@Entity({ name: 'bot_messages' })
export class BotMessage extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', nullable: false })
  botId: number;

  @ManyToOne(() => Bot, (bot) => bot.messages)
  bot: Bot;

  @Column({ type: 'varchar', nullable: false })
  text: string;

  @Column({ type: 'varchar', nullable: true })
  photo: string;

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
