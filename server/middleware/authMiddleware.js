import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

// User must be authenticated
const protect = async(req, res, next) => {
    let token;

    // Read JWT from the 'jwt' cookie
    token = await req.cookies.jwt;

    if (token) {
        try {
            const decoded = jwt.verify(token, "123");

            req.user = await User.findById(decoded.userId).select('-password');

            next();
        } catch (error) {
            console.error(error);
            res.status(401);
            throw new Error('Not authorized, token failed');
        }
    } else {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
};

export default protect;