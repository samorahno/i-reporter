import express from 'express';
import Validator from '../validation/redFlagValidator';
import RedFlagsController from '../controllers/Redflags';


const router = express.Router();
const { validateCreateRedFlag, validateRedFlagComment, validateRedFlagLocation } = Validator;

const {
  getAllRedflags,
  createRedFlag,
  getARedFlagById,
  deleteARedFlagById,
  editARedFlagComment,
  editARedFlagLocation,
} = RedFlagsController;

router.get('/', getAllRedflags);

router.post('/', validateCreateRedFlag, createRedFlag);

router.get('/:incident_id', getARedFlagById);

router.patch('/:incident_id/comment', validateRedFlagComment, editARedFlagComment);

router.patch('/:incident_id/location', validateRedFlagLocation, editARedFlagLocation);


router.delete('/:incident_id', deleteARedFlagById);


export default router;
