import { Router } from 'express';
import { register, login, auth, logout, update, getUserDetails } from '../controllers/user.controller.js';
import { forgotPassword, resetPassword } from '../controllers/resetPassword.controller.js';
import { verifyToken } from '../middlewares/auth.middleware.js';

const router = Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/auth').get(auth)
router.route('/delete').get(logout)
router.route('/user-details/:id').get(verifyToken,getUserDetails)
router.route('/update/:id').put(verifyToken,update)
router.route('/forgot-password').post(forgotPassword); 
router.route('/reset-password/:token').post(resetPassword); 


export default router;