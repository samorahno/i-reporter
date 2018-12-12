/* eslint-disable indent */
import moment from 'moment';
import uuid from 'uuid';
import jwt from 'jsonwebtoken';
import db from '../db/tables';
import dba from '../db/index';
import userAuthHelper from '../validation/userAuth';

/**
 * User Authentication Controller
 */
class UserAuthController { 

  /**
     * Create A User
     * @param {object} req
     * @param {object} res
     * @returns {object} user object
     */
    static async createUser(req, res) {
      const {
        fullname,
        email,
        password,
      } = req.body;
  
      const createQuery = `INSERT INTO
        users(id, fullname, email, password, created_date)
        VALUES($1, $2, $3, $4, $5 )
        returning *`;
  
      const hashPassword = userAuthHelper.hashPassword(req.body.password);
  
      const values = [
        uuid(),
        fullname,
        email,
        hashPassword,
        moment(new Date()),
      ];


      try {
        const { rows } = await dba.query(createQuery, values);
         const token = jwt.sign({ userId: rows[0].id, isAdmin: rows[0].isadmin },
          process.env.jwt_privateKey,
          { expiresIn: '7d' });
        return res.status(201).header('x-auth-token', token).json({
          status: 201,
          data: [{
            token,
            user: rows[0],
          }],
        });
      } catch (error) {
        if (error.routine === '_bt_check_unique') {
          return res.status(409).send({ status: 200, message: 'User with that EMAIL already exist' });
        }
          return res.json({ status: 200, error });
      }
    }

}
export default UserAuthController;
