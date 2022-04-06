import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import {WebsiteCoreUiModule} from "@cardsort-softwares/website-core-ui";
import {initializeApp} from "firebase/app";
import {environment} from "../environments/environment";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot([], { initialNavigation: 'enabledBlocking' }),
    WebsiteCoreUiModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

export const app = initializeApp(environment.firebase);
