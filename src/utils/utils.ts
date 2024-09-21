import jwt from 'jsonwebtoken';
export const generateToken = (payload: Object) => {
    const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || '';
    return jwt.sign(payload, JWT_SECRET_KEY, {expiresIn: '1h'});
};
