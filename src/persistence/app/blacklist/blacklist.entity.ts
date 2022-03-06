import { User } from '@persistence/app/user/user.entity';
import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('blacklist')
export class Blacklist {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'id' })
  ownerId: number;

  @OneToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'id' })
  userId: number;

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
