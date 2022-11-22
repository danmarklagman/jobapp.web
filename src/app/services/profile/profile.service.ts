import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { PersonalProfileRequest } from 'src/app/models/requests/personal-profile.model';
import { ProfessionalProfileRequest } from 'src/app/models/requests/professional-profile.model';

const PROFILE_API = `${environment.apiURL}/profile`;

@Injectable({
  providedIn: 'root',
})
export class ProfileService {

	constructor(
    	private http: HttpClient,
  	) {

  	}

	public getMyProfile() {

        return this.http.get(`${PROFILE_API}/me`);
    }

	public updatePersonal(profile: PersonalProfileRequest) {

		return this.http.post(`${PROFILE_API}/personal/update`, profile);
	}

	public updateProfessional(profile: ProfessionalProfileRequest) {

		return this.http.post(`${PROFILE_API}/professional/update`, profile);
	}
}
