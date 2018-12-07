'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _incidents = require('../models/incidents');

var _incidents2 = _interopRequireDefault(_incidents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class redFlagsController {
  static getAllRedflags(req, res) {
    res.send({
      status: 200,
      data: _incidents2.default
    });
  }

  static createRedFlag(req, res) {
    const dateObj = new Date();
    const redFlag = {
      id: _incidents2.default.length + 1,
      type: 'red-flag',
      title: req.body.title,
      comment: req.body.comment,
      location: req.body.location,
      culprits: req.body.culprits || '',
      status: 'new',
      createdby: 1,
      createdon: `${dateObj.getDate()}-${dateObj.getMonth() + 1}-${dateObj.getFullYear()}`
    };

    _incidents2.default.push(redFlag);
    res.status(201).send({
      status: 201,
      data: [{
        id: redFlag.id,
        message: 'Created red-flag record'
      }]
    });
  }

  static getARedFlagById(req, res) {
    const { incident_id } = req.params;
    const corruptioncase = _incidents2.default.find(c => c.id === parseInt(incident_id, 10));
    if (!corruptioncase) {
      return res.status(404).send({
        status: 404,
        error: 'The record with the given id was not found'
      });
    }
    res.send({
      status: 200,
      data: [corruptioncase]
    });
  }

  static editARedFlagComment(req, res) {
    const dateObj = new Date();
    const { comment } = req.body;
    const { incident_id } = req.params;
    const keys = Object.keys(req.body);
    const key = keys[0];
    if (keys.length !== 1 || key !== 'comment') {
      res.status(400).send({
        status: 400,
        error: 'sorry, Only the comment can be edited'
      });
      return;
    }
    const corruptioncase = _incidents2.default.find(c => c.id === parseInt(incident_id, 10));
    if (!corruptioncase) {
      res.status(404).send({
        status: 404,
        error: 'The record with the given id was not found'
      });
      return;
    }
    corruptioncase.comment = comment;
    corruptioncase.editedon = `${dateObj.getDate()}-${dateObj.getMonth() + 1}-${dateObj.getFullYear()}`;

    res.send({
      status: 200,
      data: [{
        id: corruptioncase.id,
        message: 'Updated red-flag record comment'
      }]
    });
  }

  static editARedFlagLocation(req, res) {
    const dateObj = new Date();
    const { location } = req.body;
    const { incident_id } = req.params;
    const keys = Object.keys(req.body);
    const key = keys[0];
    if (keys.length !== 1 || key !== 'location') {
      res.status(400).send({
        status: 400,
        error: 'sorry, Only the location can be edited'
      });
      return;
    }
    const corruptioncase = _incidents2.default.find(c => c.id === parseInt(incident_id, 10));
    if (!corruptioncase) {
      res.status(404).send({
        status: 404,
        error: 'The record with the given id was not found'
      });
      return;
    }
    corruptioncase.location = location;
    corruptioncase.editedon = `${dateObj.getDate()}-${dateObj.getMonth() + 1}-${dateObj.getFullYear()}`;

    res.send({
      status: 200,
      data: [{
        id: corruptioncase.id,
        message: 'Updated red-flag record’s location'
      }]
    });
  }

  static deleteARedFlagById(req, res) {
    const { incident_id } = req.params;
    const corruptioncase = _incidents2.default.find(c => c.id === parseInt(incident_id, 10));
    if (!corruptioncase) {
      res.status(404).send({
        status: 404,
        error: 'The record with the given id was not found'
      });
      return;
    }

    const index = _incidents2.default.indexOf(corruptioncase);
    _incidents2.default.splice(index, 1);
    res.send({
      status: 200,
      data: [{
        id: corruptioncase.id,
        message: 'red-flag record has been deleted'
      }]
    });
  }
}
exports.default = redFlagsController;