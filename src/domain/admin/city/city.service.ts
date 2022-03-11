import { ICityRepository } from './interface/city-repo.interface';
import { CITY_REPO } from '@config/constants';
import { CreateCityDto } from '@api/admin/city/dto/create-city.dto';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ICityService } from './interface/city-service.interface';
import { City } from '@persistence/admin/city/city.entity';
import { UpdateCityDto } from '@api/admin/city/dto/update-city.dto';
import { IFindCity } from './interface/find.interface';

const CityRepo = () => Inject(CITY_REPO);

@Injectable()
export class CityServiceImpl implements ICityService {
  constructor(@CityRepo() private cityRepository: ICityRepository) {}

  async create(data: CreateCityDto): Promise<City> {
    return this.cityRepository.newCity(data);
  }

  async findOne(id: number): Promise<IFindCity> {
    const city = await this.cityRepository.findOne(id, {
      relations: ['country'],
    });
    if (!city) throw new NotFoundException('TODO: CITY_NOT_FOUND');

    return city;
  }

  async update(id: number, data: UpdateCityDto): Promise<City> {
    const city = await this.cityRepository.findById(id);
    if (!city) throw new NotFoundException('');

    return this.cityRepository.edit(id, data);
  }

  async findByName(name: string): Promise<IFindCity> {
    const city = await this.cityRepository.findByName(name);
    if (!city) throw new NotFoundException('');

    return city;
  }

  async findByCountry(countryId: number): Promise<IFindCity[]> {
    const cities = await this.cityRepository.findByCountry(countryId);
    if (cities.length === 0) throw new NotFoundException('');

    return Promise.all(
      await cities.map((city: City) => {
        return { id: city.id, name: city.name, countryId: city.countryId };
      }),
    );
  }

  async findAll(): Promise<IFindCity[]> {
    return this.cityRepository.find({ relations: ['country'] });
  }

  async deleteOne(id: number): Promise<City> {
    const city = await this.cityRepository.findOne(id);
    if (!city) throw new NotFoundException();

    return this.cityRepository.remove(city);
  }
}
