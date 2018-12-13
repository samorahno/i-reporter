import validate from './validator';

const {validateCommentString} = validate;

export default class ValidateComment {

  static validatecomment(req, res, next) {
    if ((!req.body.comment) || (!validateCommentString(req.body.comment))) {
      return res.status(400).json({
        error: 'Comment cannot be empty and must be at least five characters',
      });
    }
    next();
  }
}