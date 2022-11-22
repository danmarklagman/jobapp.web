import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { EducationRequest } from 'src/app/models/requests/education.model';

const EDUCATION_API = `${environment.apiURL}/education`;

@Injectable({
  providedIn: 'root',
})
export class EducationService {

	constructor(
    	private http: HttpClient,
  	) {

  	}

	public getMyEducations() {

        return this.http.get(`${EDUCATION_API}/user/all`);
    }

	public create(education: EducationRequest) {

		return this.http.post(`${EDUCATION_API}/create`, education);
	}
}
