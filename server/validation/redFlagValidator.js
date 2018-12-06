import createGeneralValidator from './validator';

const {
  validateString,
  validateCommentString,
  validateCommentLength,
  validateAddress,
} = createGeneralValidator;

export default class validator {
  static validateCreateRedFlag(req, res, next) {
    const {
      title,
      comment,
      address,
      culprits,
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

    if (comment.toString().trim() === '') {
      return res.status(400).send({
        status: 400,
        error: 'Please enter a comment',
      });
    }
    return next();
  }

  static validateRedFlagComment(req, res, next) {
    const {
      comment,
    } = req.body;
    if (!validateCommentString(comment)) {
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

  static validateRedFlagAddress(req, res, next) {
    const {
      address,
    } = req.body;
    if (!validateAddress(address)) {
      return res.status(400).send({
        status: 400,
        error: 'Please enter a Location',
      });
    }
    return next();
  }
}
