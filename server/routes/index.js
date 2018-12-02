import express from 'express';
import validator from '../validation/validateCreateRedFlag';
import redFlagsController from '../controllers/redflags';


const router = express.Router();
const { validateCreateRedFlag } = validator;

const {
  getAllRedflags,
  createRedFlag,
  getARedFlagById,
  editARedFlagById,
  deleteARedFlagById,
} = redFlagsController;

router.get('/', getAllRedflags);

router.post('/', validateCreateRedFlag, createRedFlag);

router.get('/:incident_id', getARedFlagById);

router.put('/:incident_id', validateCreateRedFlag, editARedFlagById);

router.delete('/:incident_id', deleteARedFlagById);


export default router;
