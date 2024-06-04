import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { userEffects } from './User.effects';
import { selectUser } from './User.selector';
import { initialState } from './User.reducer';

describe('User-Store Effects - Unit Tests', () => {
  let actions$: Observable<Action>;
  let effects: userEffects;
  let store: MockStore;
  let localStoreMock: { [key: string]: string };

  const userState = {
    id: 5,
    name: 'Max',
    email: 'max-mustermann@gmail.com',
    imagePath: 'example.com',
    session: {
      token: 'abcdefg',
      expire: 200,
    },
  };

  beforeEach(() => {
    actions$ = new Observable<Action>();
    localStoreMock = {};

    TestBed.configureTestingModule({
      providers: [
        userEffects,
        provideMockActions(() => actions$),
        provideMockStore({
          selectors: [
            {
              selector: selectUser,
              value: {
                user: userState,
              },
            },
          ],
        }),
      ],
    });

    spyOn(Object.getPrototypeOf(localStorage), 'getItem').and.callFake(
      (key: string) => {
        return key in localStoreMock ? localStoreMock[key] : null;
      }
    );
    spyOn(Object.getPrototypeOf(localStorage), 'setItem').and.callFake(
      (key: string, value: string) => {
        localStoreMock[key] = value;
      }
    );

    effects = TestBed.inject<userEffects>(userEffects);
    store = TestBed.inject(MockStore);
  });

  it('U-Test: setUser should add the user object on local storage', () => {
    actions$ = of({ type: '[User] Set' });
    effects.saveUserData$.subscribe();
    const user = localStorage.getItem('user') as string;

    expect(JSON.parse(user)).toBeTruthy();
    expect(JSON.parse(user).user).toEqual(userState);
  });

  it('U-Test: setUserSession should add the user object on local storage', () => {
    actions$ = of({ type: '[User] Set session' });
    effects.saveUserData$.subscribe();
    const user = localStorage.getItem('user') as string;

    expect(JSON.parse(user)).toBeTruthy();
    expect(JSON.parse(user).user).toEqual(userState);
  });

  it('U-Test: loadSession should trigger setUser action with given storage data', () => {
    actions$ = of({ type: '[User] Load session' });
    localStorage.setItem('user', JSON.stringify(userState));
    effects.loadUserData$.subscribe(action => {
      expect(action).toEqual({
        type: '[User] Set',
        user: userState,
      });
    });
  });

  it('U-Test: loadSession should trigger setUser action with default data', () => {
    actions$ = of({ type: '[User] Load session' });
    effects.loadUserData$.subscribe(action => {
      expect(action).toEqual({
        type: '[User] Set',
        user: initialState,
      });
    });
  });

  afterEach(() => {
    store.resetSelectors();
  });
});
