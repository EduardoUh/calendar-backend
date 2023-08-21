import { response } from 'express';
import bcrypt from 'bcrypt';
import { User } from '../models/User.js';
import { generateJwt } from '../helpers/jwt.js';


export const signupController = async (req, res = response) => {
    const { name, email, password } = req.body;
    try {
        const user = new User({
            name,
            email,
            password,
        });

        // using bcrypt to encript the password
        user.password = await bcrypt.hash(user.password, 12);

        await user.save();
        const token = await generateJwt(user.id, user.name);
        res.status(201).json({
            ok: true,
            message: 'You have successfully signup',
            uid: user.id,
            name: user.name,
            token
        });
    } catch (error) {
        console.log(error);
        if (error.code === 11000) {
            return res.status(400).json({
                ok: false,
                message: 'User with that email already exists'
            });
        }
        res.status(500).json({
            ok: false,
            message: 'An error occurred while creating new user, please retry or contact the support team'
        });
    }
}

export const loginController = async (req, res = response) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                ok: false,
                message: 'Incorrect password or email'
            });
        }

        // comparing the incoming password and the hashed password from db
        const matched = await bcrypt.compare(password, user.password);
        if (!matched) {
            return res.status(401).json({
                ok: false,
                message: 'Incorrect password or email'
            });
        }

        const token = await generateJwt(user.id, user.name);

        res.status(200).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'An error ocurred while authenticating user, please retry or contact the support team'
        })
    }
}

export const renewTokenController = async (req, res) => {
    const { uid, name } = req;
    const token = await generateJwt(uid, name);
    res.json({
        ok: true,
        token
    });
}