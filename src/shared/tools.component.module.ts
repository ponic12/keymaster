import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { ToolsBarComponent } from './components/tools-bar/tools-bar.component';


@NgModule({
	declarations: [
		ToolsBarComponent,
	],
	imports: [
		IonicModule
	],
	exports: [
		ToolsBarComponent,
    ],
    providers:[]
})
export class ToolsComponentModule {
	constructor(){
		console.log('ToolsComponentModule constructor');
	}
}
