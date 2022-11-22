import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const COUNTRY_API = `${environment.apiURL}/country`;

@Injectable({
  providedIn: 'root',
})
export class CountryService {

	constructor(
    	private http: HttpClient,
  	) {

  	}

	public getAll() {

        return this.http.get(`${COUNTRY_API}/all`);
    }
}
