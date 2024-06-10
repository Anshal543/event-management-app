import { Router } from 'express';
import { register, login, auth, logout, update } from '../controllers/user.controller.js';
import { forgotPassword, resetPassword } from '../controllers/resetPassword.controller.js';

const router = Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/auth').get(auth)
router.route('/delete').get(logout)
router.route('/update/:id').put(update)
router.route('/forgot-password').post(forgotPassword); // Add forgot password route
router.route('/reset-password/:token').post(resetPassword); 


export default router;