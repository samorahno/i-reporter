/* eslint-disable indent */
import moment from 'moment';
import uuid from 'uuid';
import 'babel-polyfill';
import jwt from 'jsonwebtoken';
import db from '../db/tables';
import dba from '../db/index';
import userAuthHelper from '../validation/userAuth';

/**
 * 
 */
class userAuthControllerClass {   
  /**
     * Create A User
     * @param {object} req
     * @param {object} res
     * @returns {object} user object
     */
    static async createUser(req, res) {
  
      if (!req.body.fullname || !req.body.email || !req.body.password || !req.body.confirmPassword) {
        return res.status(400).send({ status: 400, error: 'Please check your input--some input missing' });
      }
      if (!userAuthHelper.isWhiteSpace(req.body.email, req.body.password, req.body.confirmPassword)) {
        return res.status(400).send({ status: 400, error: 'White Space are not allowed in input fields' });
      }
      if (typeof req.body.fullname.lenght < 3) {
          return res.status(400).send({status: 400, error: 'Full name lenght is too short'})
      }
      if (typeof req.body.fullname !== 'string') {
        return res.status(400).send({ status: 400, error: 'Full Name Is Invalid' });
      }
      if (!userAuthHelper.isValidEmail(req.body.email)) {
        return res.status(400).send({ status: 400, error: 'Please enter a valid email address' });
      }
      if (!userAuthHelper.ispasswordValid(req.body.password)) {
        return res.status(400).send({ status: 400, error: 'Password Must Be at least Five Characters And Must Be A string' });
      }
      if (!userAuthHelper.doesPasswordMatch(req.body.password, req.body.confirmPassword)) {
        return res.status(400).send({ status: 400, error: 'Passwords Do not match' });
      }
  
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
        console.log(rows);
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
        res.json({ status: 200, error });
      }
    }

}
export default userAuthControllerClass;
