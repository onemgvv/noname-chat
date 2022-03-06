import { User } from '@persistence/app/user/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('tokens')
export class Token {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  refreshToken: string;

  @Column('int')
  userId: number;

  @OneToOne(() => User, (user) => user.token, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;

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
