import { Router } from 'express';
import { createEvent, getEvents } from '../controllers/event.controller.js';
import { upload } from '../middlewares/multer.middleware.js';



const router = Router();

router.route("/create").post(
    upload.fields([
    {
        name: "image", maxCount: 1
    }
]), createEvent);
router.route("/get").get(getEvents);



export default router;