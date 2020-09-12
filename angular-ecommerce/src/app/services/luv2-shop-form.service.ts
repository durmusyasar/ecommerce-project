import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Country } from '../components/common/country';
import { State } from '../components/common/state';

@Injectable({
  providedIn: 'root'
})
export class Luv2ShopFormService {

  private countriesUrl = 'http://localhost:8080/api/countries';
  private stateUrl = 'http://localhost:8080/api/states';

  constructor(
    private htpClient: HttpClient
  ) { }

  public getCountries(): Observable<Country[]> {
    return this.htpClient.get<GetResponseCountries>(this.countriesUrl).pipe(
      map(response => response._embedded.countries)
    );
  }

  public getStates(theCountryCode: string): Observable<State[]> {
    const searchStatesUrl = `${this.stateUrl}/search/findByCountryCode?code=${theCountryCode}`;
    return this.htpClient.get<GetResponseStates>(searchStatesUrl).pipe(
      map(response => response._embedded.states)
    );
  }

  public getCreditCardMonths(startMonth: number): Observable<number[]> {
    const data: number[] = [];

    for (let theMonth = startMonth; theMonth <= 12; theMonth++) {
      data.push(theMonth);
    }
    return of(data);
  }

  public getCreditCardYears(): Observable<number[]> {
    const data: number[] = [];

    const startYear: number = new Date().getFullYear();
    const endYear: number = startYear + 10;

    for (let theYear = startYear; theYear <= endYear; theYear++) {
      data.push(theYear);
    }

    return of(data);
  }
}

interface GetResponseCountries {
  _embedded: {
    countries: Country[];
  };
}

interface GetResponseStates {
  _embedded: {
    states: State[];
  };
}
