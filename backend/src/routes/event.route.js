import { Router } from 'express';
import { createEvent, getEvents, getSingleEvent } from '../controllers/event.controller.js';
import { upload } from '../middlewares/multer.middleware.js';



const router = Router();

router.route("/create").post(
    upload.fields([
    {
        name: "image", maxCount: 1
    }
]), createEvent);
router.route("/get").get(getEvents);
router.route("/event/:id").get(getSingleEvent);



export default router;