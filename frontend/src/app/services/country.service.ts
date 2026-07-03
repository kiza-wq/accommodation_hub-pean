import { Injectable, signal } from '@angular/core';
import countries from 'world-countries';

export interface CountryOption {
  label: string;
  value: string;
  latlng: [number, number];
  region: string;
  flag: string;
}

const countryList: CountryOption[] = countries.map((country: any) => ({
  value: country.cca2,
  label: country.name.common,
  flag: country.flag,
  region: country.region,
  latlng: country.latlng as [number, number],
}));

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  findAll(): CountryOption[] {
    return countryList;
  }

  findByCode(isoCode: string): CountryOption | undefined {
    return countryList.find((c) => c.value == isoCode);
  }
}
