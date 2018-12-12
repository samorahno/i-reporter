import express from 'express';
import UserAuthController from '../controllers/UserAuthController';
import ValidateCreateUser from '../validation/ValidateCreateUser';

const { createUser } = UserAuthController;
const { validateCreate } = ValidateCreateUser;

const router = express.Router();


router.post('/signup', validateCreate, createUser);

export default router;
