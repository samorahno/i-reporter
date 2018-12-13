import express from 'express';
import UserAuthController from '../controllers/UserAuthController';
import ValidateCreateUser from '../validation/ValidateCreateUser';

const { createUser, login } = UserAuthController;
const { validateCreate, validateLogin } = ValidateCreateUser;

const router = express.Router();


router.post('/signup', validateCreate, createUser);
router.post('/login', validateLogin, login);

export default router;
