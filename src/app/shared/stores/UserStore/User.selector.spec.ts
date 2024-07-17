import { User } from './User.reducer';
import { selectSession, selectUser } from './User.selector';

describe('User-Store Selectors - Unit Tests', () => {
  const initialState: User = {
    id: 0,
    name: 'Max',
    email: 'max@example.com',
    imagePath: '',
    session: {
      token: 'sdkhfjer4949r49804',
      expire: 123,
    },
  };

  it('U-Test-1: Should select the user object', () => {
    const result = selectUser.projector(initialState);
    expect(result.name).toBe(initialState.name);
    expect(result.session.token).toBe(initialState.session.token);
  });

  it('U-Test-2: Should select the session object', () => {
    const result = selectSession.projector(initialState);
    expect(result.token).toBe(initialState.session.token);
    expect(result.expire).toBe(initialState.session.expire);
  });
});
