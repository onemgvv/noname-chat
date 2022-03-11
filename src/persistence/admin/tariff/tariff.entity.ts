import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Payment } from '../payment/payment.entity';

@Entity({ name: 'tariffs' })
export class Tariff extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'int', nullable: false })
  price: number;

  @Column({ type: 'varchar', nullable: false })
  description: string;

  @Column({ type: 'varchar', nullable: true })
  interval: 'Day' | 'Month' | 'Week';

  @Column({ type: 'int', nullable: true })
  period: number;

  @Column({ type: 'boolean', nullable: false, default: false })
  recurrent: boolean;

  @Column({ type: 'int', nullable: true })
  startHour: number;

  @Column({ type: 'int', nullable: true })
  recurrentPrice: number;

  @Column({ type: 'boolean', nullable: false, default: false })
  active: boolean;

  @OneToMany(() => Payment, (payment) => payment.tariff)
  payments: Payment[];

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
