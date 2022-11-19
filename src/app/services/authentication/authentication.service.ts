import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { Login } from 'src/app/models/login.model';

const USER_API = `${environment.apiURL}/user`;

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {

	constructor(
    	private http: HttpClient,
    	private localStorageService: LocalStorageService
  	) {

  	}

	get isLoggedIn() {
		return this.localStorageService.getKeyFromLocalStorage('jatkn') !== '';
	}

	public login(login: Login) {

		const form = {
			email: login.email,
			password: login.password,
		};

		return this.http.post(`${USER_API}/login`, form);
	}
}
