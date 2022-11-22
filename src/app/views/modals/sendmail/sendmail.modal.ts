
import { AfterViewInit, Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { finalize, SubscriptionLike } from 'rxjs';
import { MailRequest } from 'src/app/models/requests/mail.model';
import { FormValidatorService } from 'src/app/services/form-validator/form-validator';
import { MailService } from 'src/app/services/mail/mail.service';

@Component({
	selector: 'app-send-mail-modal',
	templateUrl: './sendmail.modal.html',
})

export class SendMailModal implements OnInit, AfterViewInit, OnDestroy {

	@ViewChild('closeSendMailButton') 
	public closeSendMailButton: ElementRef;

	@Output() 
	public sent: EventEmitter<any> = new EventEmitter();

	public isSending: boolean = false;
    public sendMailForm: FormGroup;

	private subscriptions: SubscriptionLike[] = [];

	constructor(
		private mailService: MailService,
		private formBuilder: FormBuilder,
		private formValidatorService: FormValidatorService,
	) {
		this.sendMailForm = this.formBuilder.group({
            email: [{
                value: '',
                disabled: this.isSending,
            }, [
                Validators.required,
            ]],
        });
	}

	get email() {

		return this.sendMailForm.get('email');
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
	
	public didSend(event: Event) {

		event.preventDefault();

        this.isSending = true;

        if (this.sendMailForm.invalid) {
			this.formValidatorService.validateAllFields(this.sendMailForm);
			this.isSending = false;
			return;
		}

        const mailPayload: MailRequest = {
            email: this.email?.value,
        };

        const createEducation$ = this.mailService.send(mailPayload)
            .pipe(
                finalize(() => {
                    this.isSending = false;
                })
            )
            .subscribe({
                next: () => {
					this.sent.emit(null);
                },
                error: (error: any) => {
                    console.log(error);
                },   
            });
		this.subscriptions.push(createEducation$);

		this.closeSendMailButton.nativeElement.click();
	}
}
