import express from 'express';
import Validator from '../validation/incidentValidator';
import RedFlagsController from '../controllers/RedFlags';
import InterventionsController from '../controllers/interventions';
import verifyTokenObj from '../validation/VerifyToken';
import VerifyIsAdmin from '../validation/VerifyIsAdmin';
import ValidateComment from '../validation/ValidateComment';


const router = express.Router();
const { verifyToken } = verifyTokenObj;
const { validateCreateRedFlag, validateRedFlagLocation, validateInterventionLocation, validateCreateIntervention } = Validator;
const { verifyIsAdmin } = VerifyIsAdmin;
const { validatecomment } = ValidateComment;


const {
  getAllRedFlags,
  createRedFlag,
  getRedFlagById,
  changeRedFlagStatus,
  changeRedFlagComment,
  deleteARedFlagById,
  editARedFlagLocation,
} = RedFlagsController;


const {
  createIntervention,
  getAllInterventions,
  getInterventionById,
  changeInterventionStatus,
  changeInterventionComment,
  editAnInterventionLocation,
  deleteAnInterventionById,
} = InterventionsController;

router.get('/red-flags', verifyToken, getAllRedFlags);
router.post('/red-flags', verifyToken, validateCreateRedFlag, createRedFlag);
router.get('/red-flags/:redflagid', verifyToken, getRedFlagById);
router.patch('/red-flags/:redflagid/status', verifyToken, verifyIsAdmin, changeRedFlagStatus);
router.patch('/red-flags/:redflagid/comment', verifyToken, validatecomment, changeRedFlagComment);
router.patch('/red-flags/:redflagid/location', verifyToken, validateRedFlagLocation, editARedFlagLocation);
router.delete('/red-flags/:redflagid', verifyToken, deleteARedFlagById);


router.post('/interventions', verifyToken, validateCreateIntervention, createIntervention);
router.get('/interventions', verifyToken, getAllInterventions);
router.get('/interventions/:interventionid', verifyToken, getInterventionById);
router.patch('/interventions/:interventionid/status', verifyToken, verifyIsAdmin, changeInterventionStatus);
router.patch('/interventions/:interventionid/comment', verifyToken, validatecomment, changeInterventionComment);
router.patch('/interventions/:interventionid/location', verifyToken, validateInterventionLocation, editAnInterventionLocation);
router.delete('/interventions/:interventionid', verifyToken, deleteAnInterventionById);

export default router;
