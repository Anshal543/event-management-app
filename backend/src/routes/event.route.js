import { Router } from 'express';
import { createEvent, getEvents, getSingleEvent, registerInEvent } from '../controllers/event.controller.js';
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
router.route("/evt/:eventId/register/:userId").post(registerInEvent);



export default router;