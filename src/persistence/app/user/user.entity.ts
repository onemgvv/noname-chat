import { Blacklist } from '@persistence/app/blacklist/blacklist.entity';
import { Topic } from '@persistence/app/topic/topic.entity';
import { UserSex } from '@common/types/user.types';
import { Filter } from '@persistence/app/filter/filter.entity';
import { Role } from '@persistence/app/role/role.entity';
import { Token } from '@persistence/app/token/token.entity';
import { Elite } from '@persistence/app/elite/elite.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  ManyToMany,
  JoinTable,
  OneToMany,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: true })
  name: string;

  @Column({ type: 'varchar', unique: true, nullable: false })
  email: string;

  @Column({ type: 'varchar', nullable: false })
  sex: UserSex;

  @Column({ type: 'varchar', nullable: true })
  photo: string;

  @Column('date')
  premium: Date;

  @Column('varchar')
  password: string;

  @Column({ type: 'string', nullable: true })
  city: string;

  @Column({ type: 'int', nullable: true })
  age: number;

  @Column({ type: 'int', nullable: false, default: 5.0 })
  rating: number;

  @Column({ type: 'date', nullable: true })
  ban: Date;

  @Column({ type: 'int', nullable: true })
  refreshCode: number;

  @Column({ type: 'date', nullable: true })
  lastUpdate: Date;

  @Column({ type: 'varchar', nullable: false, default: '0' })
  vkId: string;

  @Column({ type: 'varchar', nullable: false, default: '0' })
  googleId: string;

  @Column({ type: 'varchar', nullable: false, default: '0' })
  appleId: string;

  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable()
  roles: Role[];

  @OneToOne(() => Filter)
  filter: Filter;

  @OneToOne(() => Token, (token) => token.user)
  token: Token;

  @OneToOne(() => Elite, (elite) => elite.user)
  elite: Elite;

  @OneToMany(() => Topic, (topic) => topic.user)
  topics: Topic[];

  @OneToMany(() => Blacklist, (blacklist) => blacklist.ownerId)
  blacklist: Blacklist[];

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
