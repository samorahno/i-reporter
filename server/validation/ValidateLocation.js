import validate from './validator';

const { validateLocation } = validate;

export default class ValidateLocation {

  static validateALocation(req, res, next) {
    if ((!req.body.location) || (!validateLocation(req.body.location))) {
      return res.status(400).json({
        error: 'Location cannot be empty',
      });
    }
    next();
  }
}


