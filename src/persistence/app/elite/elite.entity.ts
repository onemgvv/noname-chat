import { User } from '@persistence/app/user/user.entity';
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

@Entity({ name: 'elite' })
export class Elite extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  description: string;

  @Column('boolean')
  adult: boolean;

  @Column('date')
  expiresIn: Date;

  @Column()
  userId: number;

  @OneToOne(() => User, (user) => user.elite)
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
