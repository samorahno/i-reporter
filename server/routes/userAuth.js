import express from 'express';
import userAuthControllerClass from '../controllers/userAuthController';

const { createUser } = userAuthControllerClass;

const router = express.Router();

// http://localhost:9000/api/v1/auth/signup
router.post('/signup', createUser);

export default router;
