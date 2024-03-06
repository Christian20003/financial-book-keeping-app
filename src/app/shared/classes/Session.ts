/**
 * This class represents a session object which is needed to verify any interaction between this client and a server.
 *
 * @property {string} token - The token received by the server to be able for user verification.
 * @property {number} expire - The time in seconds after which this token expires.
 */
export class Session {
  constructor(
    public token = '',
    public expire = 0
  ) {}

  /**
   * This method determines if the current token has expired and therefore cannot be used again for
   * user verfication.
   *
   * @returns True, if token has expired, otherwise false.
   */
  hasTokenExpired(): boolean {
    const now = new Date();
    const expired = new Date(this.expire);
    return now.getTime() > expired.getTime();
  }
}
