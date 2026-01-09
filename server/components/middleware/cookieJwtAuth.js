import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const cookieJwtAuth = (req, res, next) => {
    const token = res.cookies.token;
    try {
        const user = jwt.verify(token, process.env.JWT_SECRET)
        req.user = user;
        next();
    } catch {
        res.clearCookie("token");
        return res.redirect("/")
    }
}