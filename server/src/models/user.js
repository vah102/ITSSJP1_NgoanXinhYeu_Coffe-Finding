import db from '../config/db.js';

// Tìm người dùng theo username và password
const user = {
    getByUsernameAndPassword: async (username, password) => {
        const [rows] = await db.query(
            "SELECT * FROM user WHERE username = ? AND password = ?",
            [username, password]
        );
        return rows;
    },
};

export default user;
