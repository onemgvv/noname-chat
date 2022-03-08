import { UserSex } from '@common/types/user.types';
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

@Entity('filter')
export class Filter extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  sex: UserSex;

  @Column('int')
  ageMin: number;

  @Column('int')
  ageMax: number;

  @Column('int')
  userId: number;

  @OneToOne(() => User, (user) => user.filter, { onDelete: 'CASCADE' })
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
