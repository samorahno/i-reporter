/* eslint-disable indent */
import moment from 'moment';
import uuid from 'uuid';
import jwt from 'jsonwebtoken';
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

/**
     * Login a user
     * @param {object} req
     * @param {object} res
     * @returns {object} user object
     */
    static async login(req, res) {
      const text = 'SELECT * FROM users WHERE email = $1';
      try {
        const { rows } = await dba.query(text, [req.body.email]);
        if (!rows[0]) {
          return res.status(401).send({ status: 401, message: 'Invalid Email / Password' });
        }
        if (!userAuthHelper.comparePassword(rows[0].password, req.body.password)) {
          return res.status(401).send({ status: 401, message: 'The credentials you provided Are incorrect' });
        }
        const token = jwt.sign({ userId: rows[0].id, isAdmin: rows[0].isadmin },
          process.env.jwt_privateKey);
          
          
        return res.status(200).header('x-auth-token', token).json({
          status: 200,
          data: [{
            token,
            user: rows[0],
            message: `Welcome ${rows[0].fullname}`,
          }],
        });
      } catch (error) {
        return res.status(400).json({
          error: 400,
          message: 'incorrect credentials',
        });
      }
    }
}
export default UserAuthController;
