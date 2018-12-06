import express from 'express';
import validator from '../validation/redFlagValidator';
import redFlagsController from '../controllers/redflags';


const router = express.Router();
const { validateCreateRedFlag, validateRedFlagComment, validateRedFlagAddress } = validator;

const {
  getAllRedflags,
  createRedFlag,
  getARedFlagById,
  editARedFlagById,
  deleteARedFlagById,
  editARedFlagComment,
  editARedFlagAddress,
} = redFlagsController;

router.get('/', getAllRedflags);

router.post('/', validateCreateRedFlag, createRedFlag);

router.get('/:incident_id', getARedFlagById);

router.put('/:incident_id', validateCreateRedFlag, editARedFlagById);

router.patch('/:incident_id/comment', validateRedFlagComment, editARedFlagComment);

router.patch('/:incident_id/location', validateRedFlagAddress, editARedFlagAddress);


router.delete('/:incident_id', deleteARedFlagById);


export default router;
