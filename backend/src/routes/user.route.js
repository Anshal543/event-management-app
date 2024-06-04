import {Router} from 'express';
import {register, login, auth,logout} from '../controllers/user.controller.js';

const router = Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/auth').get(auth)
router.route('/delete').get(logout)


export default router;