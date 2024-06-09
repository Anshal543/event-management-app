import { Router } from 'express';
import { contactAdmin, getContactRequests } from '../controllers/contactUs.controller.js';

const router = Router();

router.post('/contact-us', contactAdmin);
router.get('/contact-requests', getContactRequests);

export default router;
