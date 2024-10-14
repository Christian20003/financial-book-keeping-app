import {
  deleteUser,
  setEmail,
  setUser,
  setUserImagePath,
  setUserName,
  setUserSession,
} from './User.actions';
import { initialState, userReducer } from './User.reducer';

describe('User-Store Reducer - Unit Tests', () => {
  const newState = {
    id: 5,
    name: 'Max',
    email: 'max-mustermann@gmail.com',
    imagePath: 'example.com',
    session: {
      token: 'abcdefg',
      expire: 200,
    },
  };

  it('U-Test-1: setUser should set the value of the store', () => {
    const action = setUser({ user: newState });
    const state = userReducer(initialState, action);

    expect(state).toEqual(newState);
    expect(state).not.toBe(initialState);
  });

  it('U-Test-2: setUserName should set the name attribut', () => {
    const action = setUserName({ name: newState.name });
    const state = userReducer(initialState, action);

    expect(state.name).toBe(newState.name);
  });

  it('U-Test-3: setUserImagePath should set the imagePath attribut', () => {
    const action = setUserImagePath({ imagePath: newState.imagePath });
    const state = userReducer(initialState, action);

    expect(state.imagePath).toBe(newState.imagePath);
  });

  it('U-Test-4: setEmail should set the email attribut', () => {
    const action = setEmail({ email: newState.email });
    const state = userReducer(initialState, action);

    expect(state.email).toBe(newState.email);
  });

  it('U-Test-5: setUserSession should set the session attribut', () => {
    const action = setUserSession({ session: newState.session });
    const state = userReducer(initialState, action);

    expect(state.session).toBe(newState.session);
  });

  it('U-Test-6: deleteUser should set the user object to default', () => {
    const actionSet = setUser({ user: newState });
    const stateFill = userReducer(initialState, actionSet);

    const actionDelete = deleteUser();
    const stateDefault = userReducer(stateFill, actionDelete);

    expect(stateDefault).toBe(initialState);
  });

  it('U-Test-7: should ignore an unkown action', () => {
    const action = { type: 'Unknown' };
    const state = userReducer(initialState, action);

    expect(state).toBe(initialState);
  });
});
