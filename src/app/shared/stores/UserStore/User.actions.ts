import { createAction, props } from '@ngrx/store';
import { User } from '../../classes/User';
import { Session } from '../../classes/Session';

/**
 * This action can be used to set the user-object of the corresponding store.
 *
 * @param user - The {@link User} object which should be saved.
 */
export const setUser = createAction('[User] Set', props<{ user: User }>());

/**
 * This action can be used to change the name of the {@link User} object.
 *
 * @param name - The new name of the user.
 */
export const setUserName = createAction(
  '[User] Set name',
  props<{ name: string }>()
);

/**
 * This action can be used to change the image path (profile image) of the {@link User} object.
 *
 * @param imagePath - The new image path.
 */
export const setUserImagePath = createAction(
  '[User] Set imagePath',
  props<{ imagePath: string }>()
);

/**
 * This action can be used to change the {@link Session} object of the {@link User} object.
 *
 * @param session - The new session object.
 */
export const setUserSession = createAction(
  '[User] Set session',
  props<{ session: Session }>()
);

/**
 * This action can be used to load the {@link Session} object from local storage.
 */
export const loadUserSession = createAction('[User] Load session');
