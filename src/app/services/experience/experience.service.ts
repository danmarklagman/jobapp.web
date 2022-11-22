import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ExperienceRequest } from 'src/app/models/requests/experience.model';

const EXPERIENCE_API = `${environment.apiURL}/experience`;

@Injectable({
  providedIn: 'root',
})
export class ExperienceService {

	constructor(
    	private http: HttpClient,
  	) {

  	}

	public getMyExperiences() {

        return this.http.get(`${EXPERIENCE_API}/user/all`);
    }

	public create(experience: ExperienceRequest) {

		return this.http.post(`${EXPERIENCE_API}/create`, experience);
	}
}
