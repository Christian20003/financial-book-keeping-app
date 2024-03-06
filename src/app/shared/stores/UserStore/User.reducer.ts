import { createReducer, on } from '@ngrx/store';
import { User } from '../../classes/User';
import {
  setUser,
  setUserImagePath,
  setUserName,
  setUserSession,
} from './User.actions';

const initState = new User();

export const userReducer = createReducer(
  initState,
  on(setUser, (_, action): User => action.user),
  on(setUserName, (state, action): User => {
    state.name = action.name;
    return state;
  }),
  on(setUserImagePath, (state, action): User => {
    state.imagePath = action.imagePath;
    return state;
  }),
  on(setUserSession, (state, action): User => {
    state.session = action.session;
    return state;
  })
);
