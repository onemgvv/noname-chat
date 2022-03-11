import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { Country } from '../country/country.entity';

@Entity({ name: 'cities' })
export class City extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'int', nullable: false })
  countryId: number;

  @ManyToOne(() => Country, (country) => country.cities)
  country: any;
}
