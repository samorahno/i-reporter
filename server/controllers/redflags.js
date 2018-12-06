import corruptioncases from '../models/incidents';

class redFlagsController {
  static getAllRedflags(req, res) {
    res.send({
      status: 200,
      data: corruptioncases,
    });
  }

  static createRedFlag(req, res) {
    const dateObj = new Date();
    const redFlag = {
      id: corruptioncases.length + 1,
      type: 'red-flag',
      title: req.body.title,
      comment: req.body.comment,
      address: req.body.address,
      culprits: req.body.culprits || '',
      status: 'new',
      createdby: 1,
      createdon: `${dateObj.getDate()}-${(dateObj.getMonth() + 1)}-${dateObj.getFullYear()}`,
    };

    corruptioncases.push(redFlag);
    res.send({
      status: 200,
      data: {
        id: redFlag.id,
        message: 'Created red-flag record',
      },
    });
  }

  static getARedFlagById(req, res) {
    const { incident_id } = req.params;
    const corruptioncase = corruptioncases.find(c => c.id === parseInt(incident_id, 10));
    if (!corruptioncase) {
      return res.status(404).send({
        status: 404,
        error: 'The record with the given id was not found',
      });
    }
    res.send({
      status: 200,
      data: corruptioncase,
    });
  }


  static editARedFlagById(req, res) {
    const { incident_id } = req.params;
    const corruptioncase = corruptioncases.find(c => c.id === parseInt(incident_id, 10));

    if (!corruptioncase) {
      return res.status(404).send({
        status: 404,
        error: 'The record with the given id was not found',
      });
    }

    const dateObj = new Date();
    corruptioncase.title = req.body.title;
    corruptioncase.comment = req.body.comment;
    corruptioncase.Address = req.body.address;
    corruptioncase.culprits = req.body.culprits;
    corruptioncase.editedon = `${dateObj.getDate()}-${(dateObj.getMonth() + 1)}-${dateObj.getFullYear()}`;

    res.send({
      status: 200,
      data: {
        id: corruptioncase.id,
        message: 'Updated red-flag record',
      },
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
        error: 'sorry, Only the comment can be edited',
      });
      return;
    }
    const corruptioncase = corruptioncases.find(c => c.id === parseInt(incident_id, 10));
    if (!corruptioncase) {
      res.status(404).send({
        status: 404,
        error: 'The record with the given id was not found',
      });
      return;
    }
    corruptioncase.comment = comment;
    corruptioncase.editedon = `${dateObj.getDate()}-${(dateObj.getMonth() + 1)}-${dateObj.getFullYear()}`;

    res.send({
      status: 200,
      data: {
        id: corruptioncase.id,
        message: 'Updated red-flag record comment',
      },
    });
  }

  static editARedFlagAddress(req, res) {
    const dateObj = new Date();
    const { address } = req.body;
    const { incident_id } = req.params;
    const keys = Object.keys(req.body);
    const key = keys[0];
    if (keys.length !== 1 || key !== 'address') {
      res.status(400).send({
        status: 400,
        error: 'sorry, Only the address can be edited',
      });
      return;
    }
    const corruptioncase = corruptioncases.find(c => c.id === parseInt(incident_id, 10));
    if (!corruptioncase) {
      res.status(404).send({
        status: 404,
        error: 'The record with the given id was not found',
      });
      return;
    }
    corruptioncase.address = address;
    corruptioncase.editedon = `${dateObj.getDate()}-${(dateObj.getMonth() + 1)}-${dateObj.getFullYear()}`;

    res.send({
      status: 200,
      data: {
        id: corruptioncase.id,
        message: 'Updated red-flag record’s location',
      },
    });
  }

  static deleteARedFlagById(req, res) {
    const { incident_id } = req.params;
    const corruptioncase = corruptioncases.find(c => c.id === parseInt(incident_id, 10));
    if (!corruptioncase) {
      res.status(404).send({
        status: 404,
        error: 'The record with the given id was not found',
      });
      return;
    }

    const index = corruptioncases.indexOf(corruptioncase);
    corruptioncases.splice(index, 1);
    res.send({
      status: 200,
      data: {
        id: corruptioncase.id,
        message: 'red-flag record has been deleted',
      },
    });
  }
}
export default redFlagsController;
