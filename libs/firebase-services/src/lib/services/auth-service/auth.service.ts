import {Injectable} from '@angular/core';
import {getApp} from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPhoneNumber,
  signInWithPopup,
  signOut,
  AuthProvider,
  Auth,
  User,
  signInWithEmailLink
} from "firebase/auth";
import {signIn, signOut as bsSignOut} from "@cardsort-softwares/app-store";
import {catchError, from, map, Observable, of} from "rxjs";
import {Store} from "@ngrx/store";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly authHandler: Auth;

  constructor(
    private readonly store: Store<{ user: User }>
  ) {
    const app = getApp();

    this.authHandler = getAuth(app);
    this.authHandler.onAuthStateChanged((user: User) => {
      if (!!user) {
        this.store.dispatch(
          signIn({user: user}));
        return;
      }

      this.store.dispatch(bsSignOut());
    })
  }

  public signOut(): void {
    void signOut(this.authHandler);
  }

  public signInWithPassword(email: string, password: string): Observable<boolean> {
    return from(signInWithEmailAndPassword(this.authHandler, email, password))
      .pipe(
        map((userCred) => {
          return !!userCred;
        }),
        catchError((error) => {
          console.log(error);
          return of(false);
        })
      )
  }


}
