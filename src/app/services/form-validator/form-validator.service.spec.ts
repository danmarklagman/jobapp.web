import { TestBed } from '@angular/core/testing';
import { FormValidatorService } from './form-validator';

describe('FormValidatorService', () => {
	let service: FormValidatorService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(FormValidatorService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
