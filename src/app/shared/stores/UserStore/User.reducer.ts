import { createReducer, on } from '@ngrx/store';
import {
  setEmail,
  setUser,
  setUserImagePath,
  setUserName,
  setUserSession,
} from './User.actions';

/**
 * This interface represents a session which is needed to verify any interaction between this client and a server.
 *
 * @property {string} token - The token received by the server to be able for user verification.
 * @property {number} expire - The time in seconds after which this token expires.
 */
export interface Session {
  token: string;
  expire: number;
}

/**
 * This class represents a user profile with all necessary information.
 *
 * @property {number} id - The ID of the user in the database.
 * @property {string} name - The profile name of the user.
 * @property {string} email - The email address of the user.
 * @property {string} imagePath - The URL of the profile image.
 * @property {Session} session - The session object for verification.
 */
export interface User {
  id: number;
  name: string;
  email: string;
  imagePath: string;
  session: Session;
}

/** This object represents the initial state of a user in the store */
export const initialState: User = {
  id: 0,
  name: '',
  email: '',
  imagePath: '',
  session: {
    token: '',
    expire: 0,
  },
};

export const userReducer = createReducer(
  initialState,
  on(setUser, (_, action): User => action.user),
  on(setUserName, (state, action): User => {
    state.name = action.name;
    return state;
  }),
  on(setEmail, (state, action): User => {
    state.email = action.email;
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
