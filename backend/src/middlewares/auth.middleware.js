import jwt from "jsonwebtoken"
import { customError } from "../utils/customError.js"
import { User } from "../models/user.model.js"


export const verifyToken = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return next(customError(404, "you are not authenticated!"))
        }

        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) {
                return next(customError(500, "Something is Wrong with your token!"))
            }
            
            const user = await User.findById(decoded.id);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            req.user = user;
            next();
        }
        );

    } catch (error) {
        next(customError(500, "Something is Wrong with your token!"))
    }
};