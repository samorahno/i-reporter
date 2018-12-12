import userAuthHelper from './userAuth';

/**
     * Validate created user
*/
class ValidateCreateUser {
 
  /**
     * Create A User
     * @param {object} req
     * @param {object} res
     * @param {object} next
     * @returns {object} response object
     */
  static validateCreate(req, res, next) {
    if (!req.body.fullname || !req.body.email || !req.body.password || !req.body.confirmPassword) {
      return res.status(400).send({ status: 400, error: 'Please check your input--some input missing' });
    }
    if (!userAuthHelper.isWhiteSpace(req.body.email, req.body.password, req.body.confirmPassword)) {
      return res.status(400).send({ status: 400, error: 'White Space are not allowed in input fields' });
    }
    if (typeof req.body.fullname.lenght < 3) {
      return res.status(400).send({ status: 400, error: 'Full name lenght is too short' });
    }
    if (typeof req.body.fullname !== 'string') {
      return res.status(400).send({ status: 400, error: 'Full Name Is Invalid' });
    }
    if (!userAuthHelper.isValidEmail(req.body.email)) {
      return res.status(400).send({ status: 400, error: 'Please enter a valid email address' });
    }
    if (!userAuthHelper.ispasswordValid(req.body.password)) {
      return res.status(400).send({ status: 400, error: 'Password Must Be at least Five Characters And Must Be A string' });
    }
    if (!userAuthHelper.doesPasswordMatch(req.body.password, req.body.confirmPassword)) {
      return res.status(400).send({ status: 400, error: 'Passwords Do not match' });
    }

    next();
  }
}

export default ValidateCreateUser;
