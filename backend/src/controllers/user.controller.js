import { User } from "../models/user.model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register = async (req, res, next) => {
    try {
        const { username, email, password, mobileNo } = req.body;
        const uniqueUser = await User.find({ username })
        if (uniqueUser.length > 0) {
            return res.status(400).json({ message: "User already exists" })
        }
        const uniqueEmail = await User.find({ email })
        if (uniqueEmail.length > 0) {
            return res.status(400).json({ message: "Email already exists" })
        }
        const hashedPassword = bcrypt.hashSync(password, 10);

        const user = await User.create({ username, email, password: hashedPassword, mobileNo });
        res.status(201).json({ user });
    } catch (error) {
        next(error);
    }
};

export const login = async (req, res, next) => {

    try {
        const { email, password } = req.body;
        const checkUser = await User.find({ email })
        if (!checkUser) {
            return res.status(400).json({ message: "User not found, please register" })
        }
        const validPassword = bcrypt.compareSync(password, checkUser[0].password);
        if (!validPassword) {
            return res.status(400).json({ message: "Invalid password" })

        }
        const token = jwt.sign({ id: checkUser[0]._id, user: checkUser[0].username }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.cookie('token', token, { httpOnly: true }).json({ message: "Login successfully" });
        // res.status(200).json({ checkUser });
    } catch (error) {
        next(error);
    }

};