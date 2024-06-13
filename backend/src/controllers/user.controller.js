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
        // const { password: hashedpassword, ...rest } = checkUser[0]._doc;
        const token = jwt.sign({ id: checkUser[0]._id, user: checkUser[0].username }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.cookie('token', token, { httpOnly: true }).json({ message: "Login successful" });
        // res.status(200).json({ checkUser });
    } catch (error) {
        next(error);
    }

};

export const auth = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        // const {id} = req.params;

        if (!token) {
            return res.status(401).json({ message: "you dont have any user" })
        }
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(verified.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const { password, ...rest } = user._doc;

        res.status(200).json({ rest });
    }
    catch (error) {
        next(error);
    }

}

export const logout = async (req, res, next) => {
    try {
        res.clearCookie("token");

        // Send a success response
        res.status(200).json({ message: "Logout successfully" });

    } catch (error) {
        next(error)
    }
}

export const getUserDetails = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json({ user });
    }
    catch (error) {
        next(error);
    }
}

export const update = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { username, email, password, mobileNo } = req.body;
        const hashedPassword = bcrypt.hashSync(password, 10);
        const user = await User.findByIdAndUpdate(id, { username, email, password: hashedPassword, mobileNo }, { new: true });
        res.status(200).json({ user });
    }
    catch (error) {
        next(error);
    }
}

export const googleLogin = async (req, res, next) => {
    try {
        const { email, username } = req.body;
        console.log(req.body);
        const user = await User.findOne({ email });
        console.log("test 1");
        if (user) {
            console.log("user");
            const token = jwt.sign({ id: user._id, user: user.username }, process.env.JWT_SECRET, { expiresIn: '1d' });
            console.log("test 2");

            res.cookie('token', token, { httpOnly: true }).json({ message: "Login successful" });
        } else {
            console.log("test 3");

            const newUser = await User.create({ username, email,mobileNo: "94939597959", password:  bcrypt.hashSync("123456", 10)});
            console.log("test 4");

            const token = jwt.sign({ id: newUser._id, user: newUser.username }, process.env.JWT_SECRET, { expiresIn: '1d' });
            console.log("test 5");

            res.cookie('token', token, { httpOnly: true }).json({ message: "Login successful" });
        }
    }
    catch (error) {
        next(error);
    }
}