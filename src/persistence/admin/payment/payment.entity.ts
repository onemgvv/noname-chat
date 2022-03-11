import { Tariff } from '../tariff/tariff.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'payments' })
export class Payment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  accountId: string;

  @Column({ type: 'int', nullable: false })
  invoiceId: number;

  @Column({ type: 'int', nullable: false })
  tariffId: number;

  @ManyToOne(() => Tariff, (tariff) => tariff.payments)
  tariff: Tariff;

  @Column({ type: 'varchar', nullable: true })
  subscribtionId: string;

  @Column({ type: 'date', nullable: true })
  startDate: Date;
}
