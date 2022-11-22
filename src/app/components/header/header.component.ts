import { Component } from '@angular/core';
import { BroadcasterService } from 'src/app/services/broadcaster/broadcaster.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: [
		'./header.component.scss'
	]
})

export class HeaderComponent {

	constructor(
		private broadcasterService: BroadcasterService,
	) {

	}

	public toggleSidenav() {

		this.broadcasterService.broadcast('ToggleSidenavEvent', true);
	}

	public didNavigateToProfile() {

	}

	public didLogout() {

	}
}
