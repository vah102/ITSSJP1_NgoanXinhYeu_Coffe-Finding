import jwt from 'jsonwebtoken';

const JWT_SECRET_KEY = '0de44539cf24170fc1500506fc3376b8e7de9b618a89e57611d7f2fd3b0b591c07ff4b6730f04f89d1df81301ed90a7617145dcebb4765f614f843097f68a6bc'; // Sử dụng secret key giống như khi tạo JWT

const userMiddleware = (req, res, next) => {
    const token = req.cookies.token;

    if (token) {
        jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: 'Invalid or expired token' });
            }           
            req.user = decoded; 
           
        });
    }

    next(); 
};


export default userMiddleware;