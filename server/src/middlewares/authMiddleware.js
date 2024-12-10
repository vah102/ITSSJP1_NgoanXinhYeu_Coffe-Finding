import jwt from 'jsonwebtoken';

// Secret key để xác thực JWT
const JWT_SECRET_KEY = '0de44539cf24170fc1500506fc3376b8e7de9b618a89e57611d7f2fd3b0b591c07ff4b6730f04f89d1df81301ed90a7617145dcebb4765f614f843097f68a6bc'; // Sử dụng secret key giống như khi tạo JWT

const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }

    // Kiểm tra và xác thực token
    jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid or expired token' });
        }
        // console.log(decoded);
        // Gắn thông tin người dùng vào request để sử dụng trong các route tiếp theo
        req.user = decoded;  // decoded chứa { id, username }
        next();  // Cho phép yêu cầu tiếp tục tới route kế tiếp
    });
};


export default authMiddleware;