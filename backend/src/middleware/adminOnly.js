import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const adminOnly = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        res.status(403).json({ message: "Forbidden" });
        return;
    }
    const dataAdmin = jwt.verify(token, process.env.JWT_SECRET);
    if (!dataAdmin) {
        res.status(403).json({ message: "Forbidden" });
        return;
    }
    if (dataAdmin.role !== 'admin') {
        res.status(403).json({ message: "AdminOnly" });
        return;
    }
    req.user = dataAdmin; 
    next();
}
export default adminOnly;