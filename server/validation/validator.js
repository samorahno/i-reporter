class Validator {
  static validateString(string) {
    if (!string || string === undefined || string.toString().trim() === '' || typeof string !== 'string') return false;
    if (string.length < 3 || string.length > 500) return false;
    return true;
  }

  static validateCommentLength(string) {
    if (string.length < 5 || string.length > 1500) return false;
    return true;
  }

  static validateCommentString(string) {
    if (string.length < 5 || string.length > 1500) return false;
    return true;
  }

  static validateLocation(string) {
    if (typeof string !== 'string') return false;
    if (string.length < 5 || string.length > 350) return false;
    return true;
  }
  
}
export default Validator;
