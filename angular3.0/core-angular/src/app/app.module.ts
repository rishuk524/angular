import {Component, NgModule} from "@angular/core";
import{BrowserModule} from "@angular/platform-browser";
import { appcomponent } from "./app.component";
import { cardcomponent } from "./card.component";



@NgModule({
     imports: [BrowserModule],
     declarations: [appcomponent, cardcomponent], 
     bootstrap: [appcomponent],
})
export class appmodule {}

