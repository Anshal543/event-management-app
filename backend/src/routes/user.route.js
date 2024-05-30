import {Router} from 'express';
import {register, login, auth} from '../controllers/user.controller.js';

const router = Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/auth').get(auth)


export default router;