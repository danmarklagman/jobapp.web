import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { SidebarComponent } from 'src/app/components/sidebar/sidebar.component';
import { HubPage } from './hub.page';
import { HubRoutingModule } from './hub-routing.module';

@NgModule({
	declarations: [
		HubPage,
		HeaderComponent,
		SidebarComponent,
	],
	imports: [
		CommonModule,
		HubRoutingModule,
	],
	exports: [
		HubPage,
		HeaderComponent,
		SidebarComponent,
	],
	providers: [],
})
export class HubModule { }
