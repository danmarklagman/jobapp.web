import { Observable, Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

interface Event {
	key: string;
	value: any;
}

@Injectable({
	providedIn: 'root'
})
export class BroadcasterService {

	protected eventsSubject = new Subject<Event>();

	constructor() {

	}

	broadcast(key: string, value: any) {

		this.eventsSubject.next({ key, value });
	}

	on<T>(key: string): Observable<T> {

		return this.eventsSubject.asObservable().pipe(
			filter(e => e.key === key),
			map(e => e.value)
		);
	}
}
