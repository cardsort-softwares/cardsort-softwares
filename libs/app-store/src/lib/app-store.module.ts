import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from "@ngrx/store";
import { userReducer } from "./user/user.reducer";

export * from "./user/user.action";


@NgModule({
  imports: [CommonModule, StoreModule.forRoot({ user: userReducer })],
})
export class AppStoreModule {}
