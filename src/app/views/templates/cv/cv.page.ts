import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SubscriptionLike } from 'rxjs';
import { Profile } from 'src/app/models/entities/profile.model';
import { ProfileService } from 'src/app/services/profile/profile.service';
import { environment } from 'src/environments/environment';
;

@Component({
	selector: 'app-cv',
	templateUrl: './cv.page.html',
})

export class CvPage {

	public profile: Profile = new Profile();
    public downloadLink: string;

    private userId: string | null;
    private subscriptions: SubscriptionLike[] = [];

	constructor(
        private route: ActivatedRoute,
        private router: Router,
        private profileService: ProfileService,
        private changeDetectorRef: ChangeDetectorRef,
    ) {

	}

	ngOnInit(): void {
	
        this.userId = this.route.snapshot.paramMap.get('userId');

        if (!this.userId) {
            this.router.navigate(['/auth']);
        }
	}

    ngAfterViewInit(): void {
        
        this.downloadLink = `${environment.apiBaseURL}/profile/pdf/download/${this.userId}`;
        this.changeDetectorRef.detectChanges();

        const getProfile$ = this.profileService.getUserProfile(this.userId)
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
}
