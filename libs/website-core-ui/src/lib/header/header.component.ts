import { Component, OnInit } from '@angular/core';
import {ImageService} from "@cardsort-softwares/firebase-services";
import {SafeUrl} from "@angular/platform-browser";
import {catchError, map, Observable, of} from "rxjs";

export interface IHeaderVM {
  logo: SafeUrl
}

@Component({
  selector: 'cardsort-softwares-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public vm$: Observable<IHeaderVM> | undefined;

  constructor(
    private readonly imageService: ImageService
  ) { }

  public ngOnInit(): void {
    this.vm$ = this.imageService.getImage$("core-website/logo.png")
      .pipe(
        map((image: SafeUrl) => {
          return {
            logo: image
          }
        }),
        catchError((err) => {
          console.error(err);
          return of({} as IHeaderVM);
        })
      )
  }

}
