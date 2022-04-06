import { Injectable } from '@angular/core';
import { getApp } from "firebase/app";
import { getStorage, ref, FirebaseStorage, getDownloadURL } from "firebase/storage";
import {from, map, Observable} from "rxjs";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private readonly storage: FirebaseStorage;

  constructor(
    private readonly sanitizer: DomSanitizer
  ) {
    const app = getApp();

    this.storage = getStorage(app);
  }

  public getImage$(imageLocation: string): Observable<SafeUrl> {
    const imageRef = ref(this.storage, imageLocation);
    return from(getDownloadURL(imageRef))
      .pipe(
        map((downloadUrl: string) => {
          if (!this.isValidUrl(downloadUrl)) {
            throw Error(`The provided url is invalid\n\n${downloadUrl}`);
          }
          return this.sanitizer.bypassSecurityTrustUrl(downloadUrl);
        })
      );
  }

  private isValidUrl(value: string): boolean {
    let url;
    try {
      url = new URL(value);
    } catch {
      return false;
    }
    return (url.protocol === "http:" || url.protocol === "https:") && (url.href === value || url.origin === value);
  }
}
