import moment from 'moment';
import uuid from 'uuid';
import dba from '../db/index';

/**
 * Intervention controller
 */
export default class InterventionController {
  /**
       * Create an intervention
       * @param {object} req request
       * @param {object} res response
       * @returns {object} created intervention
       */
  static async createIntervention(req, res) {
    const createQuery = `INSERT INTO 
        interventions(id, sender_id, title, type, location, comment, created_date, status)
        VALUES($1, $2, $3, $4, $5, $6, $7, $8) returning *`;

    const values = [
      uuid(),
      req.user.userId,
      req.body.title,
      'intervention',
      req.body.location,
      req.body.comment,
      moment(new Date()),
      'New',
    ];

    try {
      const { rows } = await dba.query(createQuery, values);
      return res.status(201).json({
        status: 201,
        data: [{
          id: rows[0].id,
          message: 'Created intervention record',
        }],
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        error: 'Error inserting record, please try again',
      });
    }
  }

  /**
   * Get all Intervention records
   * @param {object} req
   * @param {object} res
   * @returns {object} interventions
   */
  static async getAllInterventions(req, res) {
    try {
      const result = await dba.query('SELECT * FROM interventions');
      return res.status(200).json({
        status: 200,
        data: result.rows,
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        error,
      });
    }
  }

/**
   * get  An Intervention by ID
   * @param {object} req
   * @param {object} res
   * @returns {object} interventionController object
   */
  static async getInterventionById(req, res) {
    const { interventionid } = req.params;
    const text = 'SELECT * FROM interventions WHERE id = $1';

    try {
      const { rows } = await dba.query(text, [interventionid]);
      if (req.user.userId !== rows[0].sender_id) {
        res.status(403).send({
          status: 403,
          message: 'Forbidden!! Only User who created the record can access it',
        });
      } else {
        return res.status(200).send({
          status: 200,
          data: [rows[0]],
        });
      }
    } catch (error) {
      return res.status(400).json({
        status: 400,
        error: 'Intervention record not found',
      });
    }
  }

/**
   * Change Intervention status
   * @param {object} req
   * @param {object} res
   * @returns {object} interventions
   */
  static async changeInterventionStatus(req, res) {
    const { status } = req.body;
    const { interventionid } = req.params;
    const text = 'UPDATE interventions SET status=$1  WHERE id=$2 RETURNING *';

    // eslint-disable-next-line quotes
    if (status === "resolved" || status === "under investigation" || status === "rejected") {
      try {
        const result = await dba.query(text, [status, interventionid]);
        res.status(200).json({
          status: 200,
          data: [{
            id: result.rows[0].id,
            message: 'Updated intervention record status',
          }],
        });
      } catch (error) {
        return res.status(400).json({
          status: 400,
          message: 'Intervention record not Found',
        });
      }
    } else {
      return res.status(400).send({
        error: 400,
        message: 'The Format for status are "resolved", "under investigation", "rejected" ',
      });
    }
  }

 /**
   * Change intervention comment
   * @param {object} req
   * @param {object} res
   * @returns {object} intervention comment
   */
  static async changeInterventionComment(req, res) {
    const { comment } = req.body;
    const { interventionid } = req.params;
    const textid = 'SELECT * FROM interventions WHERE id = $1';
    const text = 'UPDATE interventions SET comment=$1,modified_date=$2  WHERE id=$3 RETURNING *';


    try {
      const rowsid = await dba.query(textid, [interventionid]);
      if (req.user.userId !== rowsid.rows[0].sender_id) {
        return res.status(403).send({
          status: 403,
          message: 'Forbidden!! Only User who created the record can edit',
        });
      }
      if (rowsid.rows[0].status !== 'New') {
        return res.status(409).send({
          status: 409,
          message: 'Error, only new Intervention records can be edited',
        });
      }
      const result = await dba.query(text, [comment, moment(new Date()), interventionid]);
      res.status(200).json({
        status: 200,
        data: [{
          id: result.rows[0].id,
          message: 'Updated intervention record’s comment',
        }],
      });
    } catch (error) {
      return res.status(400).send({
        status: 400,
        message: 'intervention record not Found',
      });
    }
  }

/**
   * Edit an intervention location
   * @param {object} req
   * @param {object} res
   * @returns {object} intervention
   */
  static async editAnInterventionLocation(req, res) {
    const { location } = req.body;
    const { interventionid } = req.params;
    const textid = 'SELECT * FROM interventions WHERE id = $1';
    const text = 'UPDATE interventions SET location=$1,modified_date=$2  WHERE id=$3 RETURNING *';


    try {
      const rowsid = await dba.query(textid, [interventionid]);
      if (req.user.userId !== rowsid.rows[0].sender_id) {
        return res.status(403).send({
          status: 403,
          message: 'Forbidden!! Only User who created the record can edit',
        });
      }
      if (rowsid.rows[0].status !== 'New') {
        return res.status(409).send({
          status: 409,
          message: 'Error, only new Interventions can be edited',
        });
      }
      const result = await dba.query(text, [location, moment(new Date()), interventionid]);
      res.status(200).json({
        status: 200,
        data: [{
          id: result.rows[0].id,
          message: 'Updated intervention record’s location',
        }],
      });
    } catch (error) {
      return res.status(400).send({
        status: 400,
        message: 'Intervention record not Found',
      });
    }
  }

/**
   * Delete an intervention
   * @param {object} req
   * @param {object} res
   * @returns {object} interventions
   */
  static async deleteAnInterventionById(req, res) {
    const deleteQuery = 'DELETE FROM interventions WHERE id=$1 returning *';
    try {
      const { rows } = await dba.query(deleteQuery, [req.params.interventionid]);
      if (!rows[0]) {
        return res.status(404).send({
          status: 400,
          message: 'Intervention record not found',
        });
      }
      return res.status(202).json({
        status: 202,
        data: [{
          id: rows[0].id,
          message: 'intervention record has been deleted',
        }],
      });
    } catch (error) {
      return res.status(400).send({
        status: 400,
        message: 'Error Deleting Intervention..',
      });
    }
  }
}
