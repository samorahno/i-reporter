'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _redFlagValidator = require('../validation/redFlagValidator');

var _redFlagValidator2 = _interopRequireDefault(_redFlagValidator);

var _redflags = require('../controllers/redflags');

var _redflags2 = _interopRequireDefault(_redflags);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express2.default.Router();
const { validateCreateRedFlag, validateRedFlagComment, validateRedFlagLocation } = _redFlagValidator2.default;

const {
  getAllRedflags,
  createRedFlag,
  getARedFlagById,
  deleteARedFlagById,
  editARedFlagComment,
  editARedFlagLocation
} = _redflags2.default;

router.get('/', getAllRedflags);

router.post('/', validateCreateRedFlag, createRedFlag);

router.get('/:incident_id', getARedFlagById);

router.patch('/:incident_id/comment', validateRedFlagComment, editARedFlagComment);

router.patch('/:incident_id/location', validateRedFlagLocation, editARedFlagLocation);

router.delete('/:incident_id', deleteARedFlagById);

exports.default = router;