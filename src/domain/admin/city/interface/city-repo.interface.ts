import { CreateCityDto } from '@api/admin/city/dto/create-city.dto';
import { UpdateCityDto } from '@api/admin/city/dto/update-city.dto';
import { City } from '@persistence/admin/city/city.entity';
import { FindCities } from '@persistence/admin/city/interface/find.interface';
import { Repository } from 'typeorm';

export interface ICityRepository extends Repository<City> {
  newCity(data: CreateCityDto): Promise<City>;
  findById(id: number): Promise<City>;
  edit(id: number, data: UpdateCityDto): Promise<City>;
  findByName(name: string): Promise<City>;
  findByCountry(countryId: number): Promise<FindCities[]>;
  receive(): Promise<City[]>;
  deleteOne(id: number): Promise<City>;
}
