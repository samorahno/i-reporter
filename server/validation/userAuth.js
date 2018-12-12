import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userAuthHelper = {

  /**
   * Hash Password Method
   * @param {string} password
   * @returns {string} returns hashed password
   */
  hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  },

  /**
   * comparePassword
   * @param {string} hashPassword
   * @param {string} password
   * @returns {Boolean} return True or False
   */
  comparePassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword);
  },

  /**
   * isValidEmail validation method
   * @param {string} email
   * @returns {Boolean} True or False
   */
  isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  },

  /**
   * ispassword valid validation method
   * @param {string} password
   * @returns {Boolean} True or False
   */
  ispasswordValid(password) {
    if (password.length > 4) return true;
    return false;
  },

  /**
   * doesPasswordMatchvalid validation method
   * @param {string} password
   * @param {string} confirmPassword
   * @returns {Boolean} True or False
   */
  doesPasswordMatch(password, confirmPassword) {
    if (password === confirmPassword) return true;
    return false;
  },
  isWhiteSpace(email, password, confirmPassword) {
    if (email.includes(' ')) return false;
    if (typeof password === 'string' && password.includes(' ')) return false;
    if (typeof confirmPassword === 'string' && confirmPassword.includes(' ')) return false;
    return true;
  },
  generateToken(id) {
    const token = jwt.sign({
      userId: id,
    },
      process.env.jwt_privateKey, { expiresIn: '7d' }
    );
    return token;
  },

};
export default userAuthHelper;
