import jwt from 'jsonwebtoken';

export const generateJwt = (uid, name) => {
    return new Promise((resolve, reject) => {
        const payload = {
            uid,
            name
        };
        jwt.sign(payload, process.env.JWT_SECRET,
            // configuration object
            {
                expiresIn: '2h'
            },
            // callback to return a error or the token
            (err, token) => {
                if (err) {
                    console.log(err);
                    reject('Couln\'t get the token');
                }
                resolve(token);
            });
    });
}
