import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { finalize, SubscriptionLike } from 'rxjs';
import { Country } from 'src/app/models/entities/country.model';
import { Profile } from 'src/app/models/entities/profile.model';
import { PersonalProfileRequest } from 'src/app/models/requests/personal-profile.model';
import { CountryService } from 'src/app/services/country/country.service';
import { FormValidatorService } from 'src/app/services/form-validator/form-validator';
import { ProfileService } from 'src/app/services/profile/profile.service';

@Component({
	selector: 'app-personal-profile-edit-form-component',
	templateUrl: './personal.component.html',
})

export class PersonalProfileEditFormComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {

    @Input()
	public profile: Profile = new Profile();

    @Output()
    public profileSaved: EventEmitter<boolean> = new EventEmitter();

    public isSaving: boolean = false;
    public personalProfileForm: FormGroup;
    public countries: Country[] = [];

    private subscriptions: SubscriptionLike[] = [];

	constructor(
        private profileService: ProfileService,
        private countryService: CountryService,
        private formBuilder: FormBuilder,
        private formValidatorService: FormValidatorService,
    ) {
        this.personalProfileForm = this.formBuilder.group({
            firstName: [{
                value: '',
                disabled: this.isSaving,
            }, [
                Validators.required,
            ]],
            lastName: [{
                value: '',
                disabled: this.isSaving,
            }, [
                Validators.required,
            ]],
			emailAddress: [{
                value: '',
                disabled: this.isSaving,
            }, [
                Validators.required,
                Validators.email,
            ]],
			phoneNumber: [{
                value: '',
                disabled: this.isSaving,
            }],
			street: [{
                value: '',
                disabled: this.isSaving,
            }],
			city: [{
                value: '',
                disabled: this.isSaving,
            }, [
                Validators.required,
            ]],
            province: [{
                value: '',
                disabled: this.isSaving,
            }, [
                Validators.required,
            ]],
            postalCode: [{
                value: '',
                disabled: this.isSaving,
            }, [
                Validators.required,
            ]],
            country: [{
                value: '',
                disabled: this.isSaving,
            }, [
                Validators.required,
            ]],
        });
	}

    get firstName() {

        return this.personalProfileForm.get('firstName');
    }

    get lastName() {

        return this.personalProfileForm.get('lastName');
    }

    get emailAddress() {

        return this.personalProfileForm.get('emailAddress');
    }

    get phoneNumber() {

        return this.personalProfileForm.get('phoneNumber');
    }

    get street() {

        return this.personalProfileForm.get('street');
    }

    get city() {

        return this.personalProfileForm.get('city');
    }

    get province() {

        return this.personalProfileForm.get('province');
    }

    get postalCode() {

        return this.personalProfileForm.get('postalCode');
    }

    get country() {

        return this.personalProfileForm.get('country');
    }

	ngOnInit(): void {
		
	}

    ngAfterViewInit(): void {
        
        this.getCountries();
    }

    ngOnChanges(changes: SimpleChanges): void {
        
        this.setDefaultModelValues(this.profile);
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

    public didSave(event: Event) {

        event.preventDefault();

        this.isSaving = true;

        if (this.personalProfileForm.invalid) {
			this.formValidatorService.validateAllFields(this.personalProfileForm);
			this.isSaving = false;
			return;
		}

        const personalProfilePayload: PersonalProfileRequest = {
            first_name: this.firstName?.value,
            last_name: this.lastName?.value,
            email: this.emailAddress?.value,
            phone_number: this.phoneNumber?.value,
            street: this.street?.value,
            city: this.city?.value,
            province: this.province?.value,
            postal_code: this.postalCode?.value,
            country: this.country?.value,
        };

        const updatePersonalProfile$ = this.profileService.updatePersonal(personalProfilePayload)
            .pipe(
                finalize(() => {
                    this.isSaving = false;
                })
            )
            .subscribe({
                next: (response: Response | any) => {
                    if (response && response.result) {
                        this.profileSaved.emit(true);
                    }
                },
                error: (error: any) => {
                    console.log(error);
                },   
            });
		this.subscriptions.push(updatePersonalProfile$);
    }

    private getCountries() {

        const getCountries$ = this.countryService.getAll()
            .pipe()
            .subscribe({
                next: (response: Response | any) => {
                    const countriesResponse: Country[] = response.result;
                    if (countriesResponse) {
                        this.countries = countriesResponse;
                    }
                },
                error: (err) => {
                    console.log(err);
                },
            });
        this.subscriptions.push(getCountries$);
    }

    private setDefaultModelValues(profile: Profile) {

        this.firstName?.setValue(profile.first_name);
        this.lastName?.setValue(profile.last_name);
        this.emailAddress?.setValue(profile.email);
        this.phoneNumber?.setValue(profile.phone_number);
        this.street?.setValue(profile.street);
        this.city?.setValue(profile.city);
        this.province?.setValue(profile.province);
        this.postalCode?.setValue(profile.postal_code);
        this.country?.setValue(profile.country);
    }
}
