import createGeneralValidator from './validator';

const {
  validateString,
  validateCommentString,
  validateCommentLength,
  validateLocation,
} = createGeneralValidator;

export default class validator {
  static validateCreateRedFlag(req, res, next) {
    const {
      title,
      comment,
      culprits,
      location,
    } = req.body;
    if (!validateString(title)) {
      return res.status(400).send({
        status: 400,
        error: 'enter a title for incident',
      });
    }

    if (culprits) {
      if (!validateString(culprits)) {
        return res.status(400).send({
          status: 400,
          error: 'Enter Culprits Information',
        });
      }
    }
    
    if (!location || !validateString(location)) {
      return res.status(400).send({
        status: 400,
        error: 'Please enter a Location',
      });
    }

    if (!comment || !validateString(comment)) {
      return res.status(400).send({
        status: 400,
        error: 'Please enter Comment',
      });
    }
    return next();
  }

  static validateRedFlagComment(req, res, next) {
    const {
      comment,
    } = req.body;
    if (!comment || !validateString(comment)) {
      return res.status(400).send({
        status: 400,
        error: 'Please enter a comment',
      });
    }
    if (!validateCommentLength(comment)) {
      return res.status(400).send({
        status: 400,
        error: 'Comment Lenght is too short',
      });
    }

    return next();
  }

  static validateRedFlagLocation(req, res, next) {
    const {
      location,
    } = req.body;
    if (!validateLocation(location)) {
      return res.status(400).send({
        status: 400,
        error: 'Please enter a Location',
      });
    }
    return next();
  }
}
