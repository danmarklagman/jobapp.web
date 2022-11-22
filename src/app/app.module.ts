import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpInterceptorConfig } from './configs/http-interceptor/http-interceptor.config';
import { AuthenticationService } from './services/authentication/authentication.service';
import { BroadcasterService } from './services/broadcaster/broadcaster.service';
import { LocalStorageService } from './services/local-storage/local-storage.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BaseModule } from './views/templates/base/base.module';
import { AuthenticateModule } from './views/templates/authenticate/authenticate.module';
import { FormValidatorService } from './services/form-validator/form-validator';
import { ProfileService } from './services/profile/profile.service';
import { IndustryService } from './services/industry/industry.service';
import { SkillService } from './services/skill/skill.service';
import { EducationService } from './services/education/education.service';
import { ExperienceService } from './services/experience/experience.service';
import { ReferenceService } from './services/reference/reference.service';
import { MailService } from './services/mail/mail.service';

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		BrowserAnimationsModule,
		BaseModule,
		AuthenticateModule,
	],
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: HttpInterceptorConfig,
			multi: true
		},
		LocalStorageService,
		BroadcasterService,
		AuthenticationService,
		FormValidatorService,
		ProfileService,
		IndustryService,
		SkillService,
		EducationService,
		ExperienceService,
		ReferenceService,
		MailService,
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
