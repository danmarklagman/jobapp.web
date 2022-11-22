import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { BroadcasterService } from 'src/app/services/broadcaster/broadcaster.service';

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: [
		'./sidebar.component.scss'
	]
})

export class SidebarComponent implements AfterViewInit {

    @ViewChild('sidenav') 
    public sidenav!: any;

	constructor(
        private broadcasterService: BroadcasterService,
    ) {

	}

    ngAfterViewInit(): void {
        
        this.broadcasterService.on('ToggleSidenavEvent')
            .subscribe({
                next: () => {
                    console.log('test');
                    this.sidenav.toggle();
                }
            });
    }
}
