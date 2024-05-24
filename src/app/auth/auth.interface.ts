/**
 * This interface represents the structure of the data which will be sent through the login event.
 *
 * @property {string} email - The entered email address from the user
 * @property {string} password - The entered password from the user
 */
export interface loginData {
  email: string;
  password: string;
}

/**
 * This interface represents the structure of the data which will be sent through the register event.
 *
 * @property {string} email - The entered email address from the user
 *  @property {string} name  - The entered username from the user
 * @property {string} password - The entered password from the user
 */
export interface registerData {
  email: string;
  name: string;
  password: string;
}

/**
 * This interface represents the structure of data which will be emitted by the SetCodeComponent.
 * It consists of all code values.
 *
 * @property {number} value1  - The first code value
 * @property {number} value2  - The second code value
 * @property {number} value3  - The third code value
 * @property {number} value4  - The forth code value
 * @property {number} value5  - The fifth code value
 * @property {number} value6  - The sixth code value
 */
export interface loginCode {
  value1: number;
  value2: number;
  value3: number;
  value4: number;
  value5: number;
  value6: number;
}
