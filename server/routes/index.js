import express from 'express';
import validator from '../validation/validateCreateRedFlag';
import redFlagsController from '../controllers/redflags';


const router = express.Router();
const {validateCreateRedFlag} = validator;

const {
    getAllRedflags,
    deleteARedFlag,
    createRedFlag,
} = redFlagsController


router.post('/red-flags/', validateCreateRedFlag, createRedFlag);

export default router;