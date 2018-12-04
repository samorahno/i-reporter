import createGeneralValidator from './validator';

const {
  validateString,
} = createGeneralValidator;

export default class validator {
  static validateCreateRedFlag(req, res, next) {
    const {
      title,
      comment,
      culprits,
    } = req.body;
    if (!validateString(title)) {
      return res.status(400).send({
        status: 400,
        error: 'enter a title for incident',
      });
    }

    if (!validateString(culprits)) {
      return res.status(400).send({
        status: 400,
        error: 'Enter culprits information',
      });
    }

    if (comment.toString().trim() === '') {
      return res.status(400).send({
        status: 400,
        error: 'Please enter a comment',
      });
    }
    return next();
  }
}
