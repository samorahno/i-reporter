import express from 'express';
import validator from '../validation/redFlagValidator';
import redFlagsController from '../controllers/redflags';


const router = express.Router();
const { validateCreateRedFlag, validateRedFlagComment } = validator;

const {
  getAllRedflags,
  createRedFlag,
  getARedFlagById,
  editARedFlagById,
  deleteARedFlagById,
  editARedFlagComment,
} = redFlagsController;

router.get('/', getAllRedflags);

router.post('/', validateCreateRedFlag, createRedFlag);

router.get('/:incident_id', getARedFlagById);

router.put('/:incident_id', validateCreateRedFlag, editARedFlagById);

router.put('/:incident_id/comment', validateRedFlagComment, editARedFlagComment);

router.delete('/:incident_id', deleteARedFlagById);


export default router;
