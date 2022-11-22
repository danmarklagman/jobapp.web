import { Component, OnInit, OnDestroy } from '@angular/core';
import { finalize, SubscriptionLike } from 'rxjs';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { FormValidatorService } from 'src/app/services/form-validator/form-validator';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { Register } from 'src/app/models/register.model';
import { RegisterResponse } from 'src/app/models/responses/register.model';
import { AuthCheckResponse } from 'src/app/models/responses/auth-check.model';

@Component({
	selector: 'app-login',
	templateUrl: './register.page.html',
    styleUrls: ['./register.page.scss'],
})

export class RegisterPage implements OnInit, OnDestroy {

    public isRegistering: boolean = false;
    public registerForm: FormGroup;

    private subscriptions: SubscriptionLike[] = [];

	constructor(
		private router: Router,
        private formBuilder: FormBuilder,
		private authenticationService: AuthenticationService,
        private localStorageService: LocalStorageService,
        public formValidatorService: FormValidatorService,
	) {
        this.registerForm = this.formBuilder.group({
            firstName: [{
                value: '',
                disabled: this.isRegistering,
            }, [
                Validators.required,
            ]],
            lastName: [{
                value: '',
                disabled: this.isRegistering,
            }, [
                Validators.required,
            ]],
            emailAddress: [{
                value: '',
                disabled: this.isRegistering,
            }, [
                Validators.required,
                Validators.email,
            ]],
            password: [{
                value: '',
                disabled: this.isRegistering,
            }, [
                Validators.required,
				Validators.pattern(/^(?=.{8,})(?=.*[A-Z])(?=.*[0-9])/)
            ]],
        });
	}

    get firstName() {

		return this.registerForm.get('firstName');
	}

    get lastName() {

		return this.registerForm.get('lastName');
	}

    get emailAddress() {

		return this.registerForm.get('emailAddress');
	}

	get password() {

		return this.registerForm.get('password');
	}

	ngOnInit(): void {

		// this.checkAuthentication();
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

    public didRegister(event: Event) {

        event.preventDefault();

        this.isRegistering = true;

        if (this.registerForm.invalid) {
			this.formValidatorService.validateAllFields(this.registerForm);
			this.isRegistering = false;
			return;
		}

        const registerPayload: Register = {
            first_name: this.firstName?.value,
            last_name: this.lastName?.value,
            email_address: this.emailAddress?.value,
            password: this.password?.value,
        };

        const register$ = this.authenticationService.register(registerPayload)
            .pipe(
                finalize(() => {
                    this.isRegistering = false;
                })
            )
            .subscribe({
                next: (response: Response | any) => {
                    if (response && response.result) {

                        const registerResponse: RegisterResponse = response.result;
                        this.localStorageService.storeOnLocalStorage('jatkn', registerResponse.access_token);
                        this.router.navigate(['/hub/my-profile']);
                    }
                },
                error: (error: any) => {
                    console.log(error);
                },   
            });
		this.subscriptions.push(register$);
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
