import moment from 'moment';
import uuid from 'uuid';
import dba from '../db/index';

/**
 * Red flag controller
 */
class RedFlagsController {

  /**
     * Create a red flag
     * @param {object} req request
     * @param {object} res response
     * @returns {object} created redflag
     */
  static async createRedFlag(req, res) {
    const createQuery = `INSERT INTO 
      redflags(id, sender_id, title, type, location, comment, culprits, created_date, status)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) returning *`;

    const values = [
      uuid(),
      req.user.userId,
      req.body.title,
      'red-flag',
      req.body.location,
      req.body.comment,
      req.body.culprits,
      moment(new Date()),
      'New',
    ];

    try {
      const { rows } = await dba.query(createQuery, values);
      return res.status(201).json({
        status: 201,
        data: [{
          id: rows[0].id,
          message: 'Created red-flag record',
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
   * Get all red flag records
   * @param {object} req
   * @param {object} res
   * @returns {object} redflags
   */
  static async getAllRedFlags(req, res) {
    try {
      const result = await dba.query('SELECT * FROM redflags');
      return res.status(200).send({
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
   * get  A red flag by ID
   * @param {object} req
   * @param {object} res
   * @returns {object} redflagController object
   */
  static async getRedFlagById(req, res) {
    const { redflagid } = req.params;
    const text = 'SELECT * FROM redflags WHERE id = $1';

    try {
      const { rows } = await dba.query(text, [redflagid]);
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
        error: 'Red-flag record not found',
      });
    }
  }

  /**
   * Change Red flag status
   * @param {object} req
   * @param {object} res
   * @returns {object} redflags
   */
  static async changeRedFlagStatus(req, res) {
    const { status } = req.body;
    const { redflagid } = req.params;
    const text = 'UPDATE redflags SET status=$1  WHERE id=$2 RETURNING *';

    // eslint-disable-next-line quotes
    if (status === "resolved" || status === "under investigation" || status === "rejected") {
      try {
        const result = await dba.query(text, [status, redflagid]);
        res.status(200).json({
          status: 200,
          data: [{
            id: result.rows[0].id,
            message: 'Updated red-flag record status',
          }],
        });
      } catch (error) {
        return res.status(400).send({
          status: 400,
          message: 'Red flag record not Found',
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
   * Change red flag comment
   * @param {object} req
   * @param {object} res
   * @returns {object} redflag comment
   */
  static async changeRedFlagComment(req, res) {
    const { comment } = req.body;
    const { redflagid } = req.params;
    const textid = 'SELECT * FROM redflags WHERE id = $1';
    const text = 'UPDATE redflags SET comment=$1,modified_date=$2  WHERE id=$3 RETURNING *';


    try {
      const rowsid = await dba.query(textid, [redflagid]);
      if (req.user.userId !== rowsid.rows[0].sender_id) {
        return res.status(403).send({
          status: 403,
          message: 'Forbidden!! Only User who created the record can edit',
        });
      }
      if (rowsid.rows[0].status !== 'New') {
        return res.status(409).send({
          status: 409,
          message: 'Error, only new Red-flags can be edited',
        });
      }
      const result = await dba.query(text, [comment, moment(new Date()), redflagid]);
      res.status(200).json({
        status: 200,
        data: [{
          id: result.rows[0].id,
          message: 'Updated red-flag record’s comment',
        }],
      });
    } catch (error) {
      return res.status(400).send({
        status: 400,
        message: 'Red flag record not Found',
      });
    }
  }

  /**
   * Edit a red flag location
   * @param {object} req
   * @param {object} res
   * @returns {object} redflag
   */
  static async editARedFlagLocation(req, res) {
    const { location } = req.body;
    const { redflagid } = req.params;
    const textid = 'SELECT * FROM redflags WHERE id = $1';
    const text = 'UPDATE redflags SET location=$1,modified_date=$2  WHERE id=$3 RETURNING *';


    try {
      const rowsid = await dba.query(textid, [redflagid]);
      if (req.user.userId !== rowsid.rows[0].sender_id) {
        return res.status(403).send({
          status: 403,
          message: 'Forbidden!! Only User who created the record can edit',
        });
      }
      if (rowsid.rows[0].status !== 'New') {
        return res.status(409).send({
          status: 409,
          message: 'Error, only new Red-flags can be edited',
        });
      }
      const result = await dba.query(text, [location, moment(new Date()), redflagid]);
      res.status(200).json({
        status: 200,
        data: [{
          id: result.rows[0].id,
          message: 'Updated red-flag record’s location',
        }],
      });
    } catch (error) {
      return res.status(400).send({
        status: 400,
        message: 'Red flag record not Found',
      });
    }
  }

 
 
    /**
   * Delete a red flag
   * @param {object} req
   * @param {object} res
   * @returns {object} redflags
   */ 
  static async deleteARedFlagById(req, res) {
    const deleteQuery = 'DELETE FROM redflags WHERE id=$1 returning *';
    try {
      const { rows } = await dba.query(deleteQuery, [req.params.redflagid]);
      if (!rows[0]) {
        return res.status(404).send({
          status: 400,
          message: 'Red-flag record not found',
        });
      }
      return res.status(202).json({
        status: 202,
        data: [{
          id: rows[0].id,
          message: 'red-flag record has been deleted',
        }],
      });
    } catch (error) {
      return res.status(400).send({
        status: 400,
        message: 'Error Deleting Red-flag..',
      });
    }
  }
}
module.exports = RedFlagsController;
