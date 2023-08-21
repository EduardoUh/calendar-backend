import { response } from 'express';
import { validationResult } from 'express-validator';


export const validateFields = (req, res = response, next) => {
    // handling error in the request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        });
    }
    next();
}