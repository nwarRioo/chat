import jwt from 'jsonwebtoken';

export const generateJWT = (payload: { [key: string]: string | number | boolean }) => {
    return jwt.sign(payload, process.env.SECRET_KEY || '', {expiresIn: '1h'})
};