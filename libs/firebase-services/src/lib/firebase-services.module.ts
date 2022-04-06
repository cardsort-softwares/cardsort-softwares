import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

export * from "./services/image-service/image.service";

@NgModule({
  imports: [CommonModule],
})
export class FirebaseServicesModule {}
