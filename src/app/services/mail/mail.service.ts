import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MailRequest } from 'src/app/models/requests/mail.model';

const MAIL_API = `${environment.apiURL}/mail`;

@Injectable({
  providedIn: 'root',
})
export class MailService {

	constructor(
    	private http: HttpClient,
  	) {

  	}

	public send(mail: MailRequest) {

		return this.http.post(`${MAIL_API}/send`, mail);
	}
}
