import dba from '../db/index';
/**
     * Verify if a logged in user is an admin
*/
export default class VerifyIsAdmin {
  
    /**
     * Create A User
     * @param {object} req
     * @param {object} res
     * @param {object} next
     * @returns {object} response object
     */
  static async verifyIsAdmin(req, res, next) {
    let { rows } = await dba.query('SELECT * FROM users WHERE id = $1', [req.user.userId]);
    if(rows[0].isadmin === false){
        return res.status(403).json({
            status: 403,
            message: "Access denied, you don't have the required credentials to access this route",
          });
    }
    next();
  }
}
