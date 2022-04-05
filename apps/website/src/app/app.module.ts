import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { RouterModule } from '@angular/router';
import {WebsiteCoreUiModule} from "@cardsort-softwares/website-core-ui";

@NgModule({
  declarations: [AppComponent, NxWelcomeComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot([], { initialNavigation: 'enabledBlocking' }),
    WebsiteCoreUiModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
