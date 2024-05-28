import jwt from "jsonwebtoken"
import { customError } from "../utils/customError.js"
import { User } from "../models/user.model.js"


export const verifyToken = async (req, res, next) => {
    const token = req.cookies.token
    if (!token) return next(customError(404, "you are not authenticated!"))
    try {
        const usertoken = jwt.verify(token, process.env.jwtSecret);
        const user = await User.findById(usertoken.id);
        req.user = user;
        next();
    } catch (error) {
        next(customError(500, "Something is Wrong with your token!"))
    }
}