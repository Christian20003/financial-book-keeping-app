import { createFeatureSelector, createSelector } from '@ngrx/store';
import { User } from './User.reducer';

const selectState = createFeatureSelector<User>('user');
export const selectUser = createSelector(selectState, (user: User) => user);
