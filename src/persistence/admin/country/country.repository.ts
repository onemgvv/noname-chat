import { Country } from './country.entity';
import { Injectable } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { CreateCountryDto } from '@api/admin/city/dto/create-country.dto';
import { UpdateCountryDto } from '@api/admin/city/dto/update-country.dto';
import { ICountryRepository } from '@domain/admin/country/interface/country-repo.interface';

@Injectable()
@EntityRepository(Country)
export class CountryRepository
  extends Repository<Country>
  implements ICountryRepository
{
  async newCountry(data: CreateCountryDto): Promise<Country> {
    const country = await this.create(data);
    return this.save(country);
  }

  async edit(id: number, data: UpdateCountryDto): Promise<Country> {
    const country: Country = await this.findOne(id);

    Object.keys(data).forEach((key) => {
      if (data[key]) country[key] = data[key];
    });

    return this.save(country);
  }

  async findByName(name: string): Promise<Country> {
    return this.findOne({ where: { name } });
  }

  async findIdByName(name: string): Promise<number> {
    const dd = await this.findOne({
      where: { name },
      select: ['id'],
    });
    return dd.id;
  }

  receiveAll(): Promise<Country[]> {
    return this.find({ relations: ['cities'] });
  }

  findById(id: number): Promise<Country> {
    return this.findOne({
      where: { id },
      relations: ['cities'],
    });
  }
}
