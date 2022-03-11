import { CreateCountryDto } from '@api/admin/city/dto/create-country.dto';
import { UpdateCountryDto } from '@api/admin/city/dto/update-country.dto';
import { Country } from '@persistence/admin/country/country.entity';

export interface ICoutnryService {
  create(data: CreateCountryDto): Promise<Country>;
  update(id: number, updateDto: UpdateCountryDto): Promise<Country>;
  findByName(name: string): Promise<Country>;
  findIdByName(name: string): Promise<number>;
  receiveAll(): Promise<Country[]>;
  findById(id: number): Promise<Country>;
  remove(id: number): Promise<Country>;
}
