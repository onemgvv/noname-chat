import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'bots' })
export class Bot extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false, unique: true })
  name: string;

  @Column({ type: 'varchar', nullable: false })
  photo: string;

  @Column({ type: 'boolean', nullable: false, default: false })
  active: boolean;
}
