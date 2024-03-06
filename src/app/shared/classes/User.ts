import { Session } from './Session';

/**
 * This class represents a user profile with all necessary information.
 *
 * @property {number} id - The ID of the user in the database.
 * @property {string} name - The profile name of the user.
 * @property {string} imagePath - The URL of the profile image.
 * @property {Session} session - The session object for verification.
 */
export class User {
  constructor(
    public id = 0,
    public name = '',
    public imagePath = '',
    public session = new Session()
  ) {}
}
