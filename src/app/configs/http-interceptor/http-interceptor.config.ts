import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { BroadcasterService } from 'src/app/services/broadcaster/broadcaster.service';

@Injectable({
	providedIn: 'root'
})
export class HttpInterceptorConfig implements HttpInterceptor {

	constructor(
		private router: Router,
		private localStorageService: LocalStorageService,
		private broadcastService: BroadcasterService,
	) {

	}

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

		const token: string = this.localStorageService.getKeyFromLocalStorage(`jatkn`);

		if (token) {
			request = request.clone({ headers: request.headers.set(`Authorization`, `Bearer ${token}`) });
		}

		// if (!request.headers.has(`Content-Type`)) {
		// 	request = request.clone({ headers: request.headers.set(`Content-Type`, `application/json`) });
		// }

		request = request.clone({ headers: request.headers.set(`Accept`, `application/json`) });

		return next.handle(request).pipe(
			map((event: HttpEvent<any>) => {
				if (event instanceof HttpResponse) {
					// console.log('event--->>>', event);
				}
				return event;
			}),
			catchError((error) => {
				if (error instanceof HttpErrorResponse && error.status === 401) {
					this.broadcastService.broadcast(`UnauthenticatedEvent`, true);
					this.router.navigateByUrl(`/auth/login`);
					return of(error as any);
				}
				else if (error instanceof HttpErrorResponse && error.status === 500) {
					this.broadcastService.broadcast(`Error500Event`, true);
				}
				return throwError(() => error);
			})
		);
	}
}
