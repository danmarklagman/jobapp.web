import { AfterViewInit, Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize, SubscriptionLike } from 'rxjs';
import { Skill } from 'src/app/models/entities/skill.model';
import { SkillRequest } from 'src/app/models/requests/skill.model';
import { FormValidatorService } from 'src/app/services/form-validator/form-validator';
import { SkillService } from 'src/app/services/skill/skill.service';

@Component({
	selector: 'app-add-skill-modal',
	templateUrl: './add-skill.modal.html',
})

export class AddSkillModal implements OnInit, AfterViewInit, OnDestroy {

	@ViewChild('closeSkillButton') 
	public closeSkillButton: ElementRef;

	@Output() 
	public saved: EventEmitter<Skill> = new EventEmitter();

	public isSaving: boolean = false;
    public skillForm: FormGroup;

	private subscriptions: SubscriptionLike[] = [];

	constructor(
		private skillService: SkillService,
		private formBuilder: FormBuilder,
		private formValidatorService: FormValidatorService,
	) {
		this.skillForm = this.formBuilder.group({
            name: [{
                value: '',
                disabled: this.isSaving,
            }, [
                Validators.required,
            ]],
            rating: [{
                value: '',
                disabled: this.isSaving,
            }, [
                Validators.required,
				Validators.min(0),
				Validators.max(10),
            ]],
        });
	}

	get name() {

		return this.skillForm.get('name');
	}

	get rating() {

		return this.skillForm.get('rating');
	}

	ngOnInit(): void {
		
	}

	ngAfterViewInit(): void {
		
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
	
	public didSave(event: Event) {

		event.preventDefault();

        this.isSaving = true;

        if (this.skillForm.invalid) {
			this.formValidatorService.validateAllFields(this.skillForm);
			this.isSaving = false;
			return;
		}

        const skillPayload: SkillRequest = {
            name: this.name?.value,
            rating: this.rating?.value,
        };

        const createSkill$ = this.skillService.create(skillPayload)
            .pipe(
                finalize(() => {
                    this.isSaving = false;
                })
            )
            .subscribe({
                next: (response: Response | any) => {
					const skill: Skill = response.result;
                    if (skill) {
						console.log(skill);
                        this.saved.emit(skill);
                    }
                },
                error: (error: any) => {
                    console.log(error);
                },   
            });
		this.subscriptions.push(createSkill$);

		this.closeSkillButton.nativeElement.click();
	}
}
