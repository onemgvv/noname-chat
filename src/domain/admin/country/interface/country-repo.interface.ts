import { CreateCountryDto } from '@api/admin/city/dto/create-country.dto';
import { UpdateCountryDto } from '@api/admin/city/dto/update-country.dto';
import { Country } from '@persistence/admin/country/country.entity';
import { Repository } from 'typeorm';

export interface ICountryRepository extends Repository<Country> {
  newCountry(data: CreateCountryDto): Promise<Country>;
  edit(id: number, data: UpdateCountryDto): Promise<Country>;
  findByName(name: string): Promise<Country>;
  findIdByName(name: string): Promise<number>;
  receiveAll(): Promise<Country[]>;
  findById(id: number): Promise<Country>;
}
