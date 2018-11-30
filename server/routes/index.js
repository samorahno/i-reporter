import express from 'express';
import validator from '../validation/validateCreateRedFlag';
import redFlagsController from '../controllers/redflags';


const router = express.Router();
const {validateCreateRedFlag} = validator;

const {
    getAllRedflags,
    deleteARedFlag,
    createRedFlag,
    getARedFlagById,
    editARedFlagById,
} = redFlagsController;

router.get('/red-flags/', getAllRedflags);

router.post('/red-flags/', validateCreateRedFlag, createRedFlag);

router.get('/red-flags/:incident_id', getARedFlagById);

router.put('/red-flags/:incident_id', validateCreateRedFlag, editARedFlagById);


export default router;