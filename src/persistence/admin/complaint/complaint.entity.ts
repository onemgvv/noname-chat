import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'complaint' })
export class Complaint extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  senderId: number;

  @Column({ type: 'int' })
  targetId: number;

  @Column({ type: 'boolean' })
  active: boolean;

  @Column({ type: 'varchar' })
  text: string;

  @Column({ type: 'varchar' })
  type: string;
}
