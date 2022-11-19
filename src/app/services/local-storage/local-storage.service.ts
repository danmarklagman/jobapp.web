import { Injectable, Inject } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';

const STORAGE_KEY = 'mn';

@Injectable({
	providedIn: 'root'
})
export class LocalStorageService {

	constructor(
        @Inject(LOCAL_STORAGE) private storage: StorageService
    ) {

	}

	public pushOnLocalStorage(k: string, v: string): void {

		const storedList = this.storage.get(STORAGE_KEY) || [];

		storedList.push({
			key: k,
			value: v
		});

		this.storage.set(STORAGE_KEY, storedList);

		console.log(this.storage.get(STORAGE_KEY) || 'LocaL storage is empty');
	}

	public storeOnLocalStorage(k: string, v: string) {

		this.storage.set(k, v);
	}

	public getKeyFromLocalStorage(k: string) {

		return this.storage.get(k) || '';
	}

	public getListFromLocalStorage() {

		return this.storage.get(STORAGE_KEY) || [];
	}

	public removeFromLocalStorage(k: string) {

		return this.storage.remove(k);
	}

	public removeAllItems() {

		return this.storage.clear();
	}
}
