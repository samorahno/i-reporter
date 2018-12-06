import express from 'express';
import validator from '../validation/redFlagValidator';
import redFlagsController from '../controllers/redflags';


const router = express.Router();
const { validateCreateRedFlag, validateRedFlagComment, validateRedFlagLocation } = validator;

const {
  getAllRedflags,
  createRedFlag,
  getARedFlagById,
  deleteARedFlagById,
  editARedFlagComment,
  editARedFlagLocation,
} = redFlagsController;

router.get('/', getAllRedflags);

router.post('/', validateCreateRedFlag, createRedFlag);

router.get('/:incident_id', getARedFlagById);

router.patch('/:incident_id/comment', validateRedFlagComment, editARedFlagComment);

router.patch('/:incident_id/location', validateRedFlagLocation, editARedFlagLocation);


router.delete('/:incident_id', deleteARedFlagById);


export default router;
