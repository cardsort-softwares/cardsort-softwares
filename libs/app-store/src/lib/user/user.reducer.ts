import { on, createReducer } from "@ngrx/store";
import { User } from "firebase/auth";
import { signIn, signOut } from "./user.action";

export const initialState: User = null;

export const userReducer = createReducer(
  initialState,
  on(signOut, (state) => null),
  on(signIn, (state, { user }) => user)
)
