import { response } from 'express';
import jwt from 'jsonwebtoken';


export const validateJwt = (req, res = response, next) => {
    // x-token
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            ok: false,
            message: 'Token is required'
        });
    }

    try {
        // verify method returns the payload
        const { uid, name } = jwt.verify(token, process.env.JWT_SECRET);
        req.uid = uid;
        req.name = name;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            ok: false,
            message: 'Invalid token'
        });
    }
}
