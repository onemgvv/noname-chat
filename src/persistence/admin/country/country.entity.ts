import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { City } from '../city/city.entity';

@Entity({ name: 'countries' })
export class Country extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @OneToMany(() => City, (city) => city.country)
  cities: City[];
}
