import express from 'express';
import { CreateGroup ,GetGroups , JoinGroup} from '../controllers/group.controller.js';

const router = express.Router();


router.post('/create',CreateGroup);
router.get('/get-groups/:userId',GetGroups);
router.patch('/join/:groupId/:userId',JoinGroup);

export default router;