import { TestBed } from '@angular/core/testing';
import { HttpInterceptorConfig } from './http-interceptor.config';

describe('HttpInterceptorConfig', () => {
	let service: HttpInterceptorConfig;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(HttpInterceptorConfig);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
