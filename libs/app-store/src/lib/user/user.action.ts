import {createAction, props} from "@ngrx/store";
import { User } from "firebase/auth"

export const signIn = createAction("[User Service] Sign in", props<{user: User}>());
export const signOut = createAction("[User Service] Sign Out");
