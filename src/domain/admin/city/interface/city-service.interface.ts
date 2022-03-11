import { CreateCityDto } from '@api/admin/city/dto/create-city.dto';
import { UpdateCityDto } from '@api/admin/city/dto/update-city.dto';
import { City } from '@persistence/admin/city/city.entity';
import { IFindCity } from './find.interface';

export interface ICityService {
  create(data: CreateCityDto): Promise<City>;
  findOne(id: number): Promise<IFindCity>;
  update(id: number, data: UpdateCityDto): Promise<City>;
  findByName(name: string): Promise<IFindCity>;
  findByCountry(countryId: number): Promise<IFindCity[]>;
  findAll(): Promise<IFindCity[]>;
  deleteOne(id: number): Promise<City>;
}
