import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { SkillRequest } from 'src/app/models/requests/skill.model';
import { ReferenceRequest } from 'src/app/models/requests/reference.model';

const REFERENCE_API = `${environment.apiURL}/reference`;

@Injectable({
  providedIn: 'root',
})
export class ReferenceService {

	constructor(
    	private http: HttpClient,
  	) {

  	}

	public getMyReferences() {

        return this.http.get(`${REFERENCE_API}/user/all`);
    }

	public create(reference: ReferenceRequest) {

		return this.http.post(`${REFERENCE_API}/create`, reference);
	}
}
