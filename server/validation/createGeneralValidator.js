class createGeneralValidator {
  static validateString(string) {
    if (!string || string === undefined || string.toString().trim() === '' || typeof string !== 'string') return false;
    if (string.length < 3 || string.length > 500) return false;
    return true;
  }

  // validate email
  /* static validateEmail(string) {
  } */
}
export default createGeneralValidator;
