import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const INDUSTRY_API = `${environment.apiURL}/industry`;

@Injectable({
  providedIn: 'root',
})
export class IndustryService {

	constructor(
    	private http: HttpClient,
  	) {

  	}

	public getAll() {

        return this.http.get(`${INDUSTRY_API}/all`);
    }
}
