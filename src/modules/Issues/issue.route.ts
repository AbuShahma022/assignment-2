import {Router} from 'express';
import { issueController } from './issue.Controller.js';
import auth from '../../middleware/auth.js';
import { UserRole } from '../../types/index.js';

const router = Router()

router.post(("/issues"),auth(UserRole.contributor,UserRole.maintainer),issueController.Create_Issue)
router.get(("/issues"),issueController.Get_All_Issues)
router.get(("/issues/:id"),issueController.Get_Single_Issue)
router.patch(("/issues/:id"),auth(UserRole.maintainer,UserRole.contributor),issueController.Update_Issue)
router.delete(("/issues/:id"),auth(UserRole.maintainer),issueController.Delete_Issue)


export const issueRouter = router