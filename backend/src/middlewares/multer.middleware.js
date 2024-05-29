import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/temp");
        console.log("enter destination");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
        console.log("enter filename");
    },
});

export const upload = multer({
    storage,
})