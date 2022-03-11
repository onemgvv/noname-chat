import { ICountryRepository } from '@domain/admin/country/interface/country-repo.interface';
import { COUNTRY_REPO } from '@config/constants';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ICoutnryService } from './interface/country-service.interface';
import { CreateCountryDto } from '@api/admin/city/dto/create-country.dto';
import { Country } from '@persistence/admin/country/country.entity';
import { UpdateCountryDto } from '@api/admin/city/dto/update-country.dto';
import { ICountryId } from './interface/country-id.interface';

const CountryRepo = () => Inject(COUNTRY_REPO);

@Injectable()
export class CountryServiceImpl implements ICoutnryService {
  constructor(@CountryRepo() private countryRepository: ICountryRepository) {}

  create(data: CreateCountryDto): Promise<Country> {
    return this.countryRepository.newCountry(data);
  }

  async update(id: number, data: UpdateCountryDto): Promise<Country> {
    const country: Country = await this.countryRepository.findById(id);
    if (!country) throw new NotFoundException('В системе нет стран');

    return this.countryRepository.edit(id, data);
  }

  async findByName(name: string): Promise<Country> {
    const country = await this.countryRepository.findByName(name);
    if (!country) throw new NotFoundException('TODO: country consts');

    return country;
  }

  async findIdByName(name: string): Promise<number> {
    const country: ICountryId = await this.countryRepository.findOne({
      where: { name },
      select: ['id'],
    });
    if (!country)
      throw new NotFoundException('Country with this id not found in system');
    return country.id;
  }

  async receiveAll(): Promise<Country[]> {
    const countries = await this.countryRepository.find({
      relations: ['cities'],
    });
    if (countries.length === 0) throw new NotFoundException('');

    return countries;
  }

  async findById(id: number): Promise<Country> {
    const country = await this.countryRepository.findOne(id, {
      relations: ['cities'],
    });
    if (!country) throw new NotFoundException();

    return country;
  }

  async remove(id: number): Promise<Country> {
    const country = await this.countryRepository.findOne(id);
    if (!country) throw new NotFoundException('Country not found');

    return this.countryRepository.remove(country);
  }
}
