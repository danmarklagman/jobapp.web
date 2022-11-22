import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize, SubscriptionLike } from 'rxjs';
import { Profile } from 'src/app/models/entities/profile.model';
import { ProfileService } from 'src/app/services/profile/profile.service';

@Component({
	selector: 'app-view-my-profile',
	templateUrl: './view.page.html',
	styleUrls: ['./view.page.scss'],
})

export class ViewMyProfilePage implements OnInit, AfterViewInit, OnDestroy {

    public profile: Profile = new Profile();

    private subscriptions: SubscriptionLike[] = [];

	constructor(
        private router: Router,
        private profileService: ProfileService,
    ) {

	}

	ngOnInit(): void {
		
	}

    ngAfterViewInit(): void {
        
        const getProfile$ = this.profileService.getMyProfile()
            .pipe()
            .subscribe({
                next: (response: Response | any) => {
                    const profileResponse: Profile = response.result;
                    this.profile = profileResponse;
                },
                error: (err) => console.log(err)
            });
        this.subscriptions.push(getProfile$);
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

    public didGoToEditMyProfilePage() {

		this.router.navigate(['/hub/my-profile/edit']);
	}
}
