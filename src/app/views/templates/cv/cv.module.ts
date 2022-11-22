import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CvPage } from './cv.page';
import { CvRoutingModule } from './cv-routing.module';

@NgModule({
	declarations: [
		CvPage,
	],
	imports: [
		CommonModule,
		CvRoutingModule,
	],
	exports: [
		CvPage,
	],
	providers: [],
})
export class CvModule { }
