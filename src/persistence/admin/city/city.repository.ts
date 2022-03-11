import { ICityRepository } from '@domain/admin/city/interface/city-repo.interface';
import { CreateCityDto } from '@api/admin/city/dto/create-city.dto';
import { UpdateCityDto } from '@api/admin/city/dto/update-city.dto';
import { Injectable } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { City } from './city.entity';
import { FindCities } from './interface/find.interface';

@Injectable()
@EntityRepository(City)
export class CityRepository
  extends Repository<City>
  implements ICityRepository
{
  async newCity(data: CreateCityDto): Promise<City> {
    const city = await this.create(data);
    return this.save(city);
  }

  findById(id: number): Promise<City> {
    return this.findOne(id);
  }

  async edit(id: number, data: UpdateCityDto): Promise<City> {
    const city = await this.findOne(id);

    Object.keys(data).forEach((key) => {
      if (data[key]) city[key] = data[key];
    });

    return this.save(city);
  }

  findByName(name: string): Promise<City> {
    return this.findOne({ where: { name } });
  }

  async findByCountry(countryId: number): Promise<FindCities[]> {
    const cities = await this.find({ where: { countryId } });

    return Promise.all(
      await cities.map((city: City) => {
        return { id: city.id, name: city.name, countryId: city.countryId };
      }),
    );
  }

  receive(): Promise<City[]> {
    return this.find();
  }

  async deleteOne(id: number): Promise<City> {
    const city = await this.findOne(id);
    return this.remove(city);
  }
}
