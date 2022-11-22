import { Component, OnInit, OnDestroy } from '@angular/core';
import { finalize, SubscriptionLike } from 'rxjs';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { FormValidatorService } from 'src/app/services/form-validator/form-validator';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { AuthCheckResponse } from 'src/app/models/responses/auth-check.model';
import { Login } from 'src/app/models/login.model';
import { LoginResponse } from 'src/app/models/responses/login.model';

@Component({
	selector: 'app-login',
	templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit, OnDestroy {

    public isLoggingIn: boolean = false;
    public loginForm: FormGroup;

    private subscriptions: SubscriptionLike[] = [];

	constructor(
		private router: Router,
        private formBuilder: FormBuilder,
		private authenticationService: AuthenticationService,
        private localStorageService: LocalStorageService,
        public formValidatorService: FormValidatorService,
	) {
        this.loginForm = this.formBuilder.group({
            emailAddress: [{
                value: '',
                disabled: this.isLoggingIn,
            }, [
                Validators.required,
                Validators.email,
            ]],
            password: [{
                value: '',
                disabled: this.isLoggingIn,
            }, [
                Validators.required,
				Validators.pattern(/^(?=.{8,})(?=.*[A-Z])(?=.*[0-9])/)
            ]],
        });
	}

    get emailAddress() {

		return this.loginForm.get('emailAddress');
	}

	get password() {

		return this.loginForm.get('password');
	}

	ngOnInit(): void {

		this.checkAuthentication();
	}

    ngOnDestroy(): void {
        
        if (this.subscriptions.length > 0) {
            this.subscriptions.forEach((subscription: SubscriptionLike) => {
                if (typeof subscription !== undefined) {
                    subscription.unsubscribe();
                }
            });
        }
    }

    public didLogin(event: Event) {

        event.preventDefault();

        this.isLoggingIn = true;

        if (this.loginForm.invalid) {
			this.formValidatorService.validateAllFields(this.loginForm);
			this.isLoggingIn = false;
			return;
		}

        const loginPayload: Login = {
            email_address: this.emailAddress?.value,
            password: this.password?.value,
        };

        const login$ = this.authenticationService.login(loginPayload)
            .pipe(
                finalize(() => {
                    this.isLoggingIn = false;
                })
            )
            .subscribe({
                next: (response: Response | any) => {
                    if (response && response.result) {

                        const loginResponse: LoginResponse = response.result;
                        this.localStorageService.storeOnLocalStorage('jatkn', loginResponse.access_token);
                        this.router.navigate(['/hub/dashboard']);
                    }
                },
                error: (error: any) => {
                    console.log(error);
                },   
            });
		this.subscriptions.push(login$);

        this.router.navigate(['/dashboard']);
    }

	private checkAuthentication() {

		const checkAuthentication$ = this.authenticationService.check()
            .pipe()
            .subscribe({
                next: (response: Response | any) => {
                    
                    const authCheckResponse: AuthCheckResponse = response.result;
                    if (authCheckResponse && authCheckResponse.authenticated) {
                        this.router.navigate(['/hub']);
                    }
                },
                error: (error: any) => {
                    console.log(error);
                },   
            });
		this.subscriptions.push(checkAuthentication$);
	}
}
