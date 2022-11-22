import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { Login } from 'src/app/models/login.model';
import { Register } from 'src/app/models/register.model';

const AUTH_API = `${environment.apiURL}/auth`;

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {

	constructor(
    	private http: HttpClient,
    	private localStorageService: LocalStorageService
  	) {

  	}

	get isLoggedIn(): boolean {
		return this.localStorageService.getKeyFromLocalStorage('jatkn') !== '';
	}

	public login(login: Login) {

		const form = {
			email: login.email_address,
			password: login.password,
		};

		return this.http.post(`${AUTH_API}/login`, form);
	}

	public register(register: Register) {

		const form = {
			first_name: register.first_name,
			last_name: register.last_name,
			email: register.email_address,
			password: register.password,
		};

		return this.http.post(`${AUTH_API}/register`, form);
	}

	public check() {

		return this.http.get(`${AUTH_API}/check`);
	}
}
