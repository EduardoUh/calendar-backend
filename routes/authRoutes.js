/* 
    User routes / Auth
    host + /api.calendarapp/v1/auth + endpoint
*/

import express from 'express';
import { check } from 'express-validator';
import { validateFields, validateJwt } from '../middlewares/index.js';
import { signupController, loginController, renewTokenController } from '../controllers/authControllers.js';

const authRouter = express.Router();

authRouter.post('/auth/signup',
    [
        // middlewares
        check('name').not().isEmpty().withMessage('Name is a required field'),
        check('email').isEmail().withMessage('Provide a valid email'),
        check('password').isLength({ min: 8 }).withMessage('Password should contain at least 8 characters'),
        validateFields
    ],
    signupController);

authRouter.post('/auth/login',
    [
        // middlewares
        check('email').isEmail().withMessage('Provide a valid email'),
        check('password').isLength({ min: 8 }).withMessage('Password should contain at least 8 characteres'),
        validateFields
    ],
    loginController);


authRouter.get('/auth/renew-token',
    validateJwt,
    renewTokenController);

export { authRouter };