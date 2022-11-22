import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { PersonalProfileRequest } from 'src/app/models/requests/personal-profile.model';
import { ProfessionalProfileRequest } from 'src/app/models/requests/professional-profile.model';
import { SkillRequest } from 'src/app/models/requests/skill.model';

const SKILL_API = `${environment.apiURL}/skill`;

@Injectable({
  providedIn: 'root',
})
export class SkillService {

	constructor(
    	private http: HttpClient,
  	) {

  	}

	public getMySkills() {

        return this.http.get(`${SKILL_API}/user/all`);
    }

	public create(skill: SkillRequest) {

		return this.http.post(`${SKILL_API}/create`, skill);
	}
}
