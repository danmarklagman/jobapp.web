import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpInterceptorConfig } from './configs/http-interceptor/http-interceptor.config';
import { AuthenticationService } from './services/authentication/authentication.service';
import { BroadcasterService } from './services/broadcaster/broadcaster.service';
import { LocalStorageService } from './services/local-storage/local-storage.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		BrowserAnimationsModule,
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
		
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
