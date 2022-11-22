import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable({
	providedIn: 'root'
})
export class FormValidatorService {

	constructor() {

	}

	public validateAllFields(formGroup: FormGroup) {

		Object.keys(formGroup.controls).forEach(field => {
			const control = formGroup.get(field);
			if (control instanceof FormControl) {
				control.markAsTouched({ onlySelf: true });
			} else if (control instanceof FormGroup) {
				this.validateAllFields(control);
			}
		});
	}

	public validateFormField(formGroup: FormGroup, fieldName: string) {

		!formGroup.get(fieldName)!.valid && formGroup.get(fieldName)!.touched;
	}
}
