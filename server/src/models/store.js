import db from "../config/db.js";

const store = {
    getAll: async () => {
        const [rows] = await db.query("SELECT * FROM store");
        return rows;
    },

    getById: async (id) => {
        const [rows] = await db.query(
            "SELECT * FROM stores WHERE store_id = ?",
            [id]
        );
        return rows;
    },
    getByHighRate: async () => {
        const [rows] = await db.query("SELECT * FROM store WHERE rate >= 4.0");
        return rows;
    },
    sortByHighRate: async () => {
        const [rows] = await db.query(
            "SELECT * FROM store WHERE rate >= 4.0 ORDER BY rate DESC"
        );
        return rows;
    },
    search: async (keyword) => {
        const [rows] = await db.query(
            `SELECT * FROM store WHERE 
         name LIKE ? OR 
         address LIKE ?`,
            [`%${keyword}%`, `%${keyword}%`]
        );
        return rows;
    },
    filter: async (filters) => {
        const { min_price, max_price, style, feature } = filters; // Nhận giá trị price và style từ filters
        let query =
            "SELECT DISTINCT s.* FROM store s LEFT JOIN Features_store fs ON s.store_id = fs.store_id LEFT JOIN Features f ON fs.feature_id = f.feature_id WHERE 1=1";
        const params = [];

        // Lọc theo khoảng giá (price nằm giữa min_price và max_price)
        if (min_price) {
            query += " AND ? > s.min_price";
            params.push(min_price);
        }
        if (max_price) {
            query += " AND ? < s.max_price";
            params.push(max_price);
        }

        // Lọc theo phong cách nếu có
        if (style && style.length > 0) {
            const placeholders = style.map(() => "?").join(", "); // Tạo các placeholder `?` cho mảng
            query += ` AND s.style IN (${placeholders})`;
            params.push(...style); // Thêm các giá trị style vào params
        }

        if (feature && feature.length > 0) {
            query += ` AND f.features_name IN (?)`;
            params.push(feature);
        }

        // Thực thi truy vấn
        const [rows] = await db.query(query, params);
        return rows;
    },

    searchAndFilter: async (keyword, filters, sortOption) => {
        const { min_price, max_price, style, feature } = filters;

        // Base query for search and filter
        let query = `
          SELECT DISTINCT s.* 
          FROM store s
          LEFT JOIN Features_store fs ON s.store_id = fs.store_id
          LEFT JOIN Features f ON fs.feature_id = f.feature_id
          WHERE (s.name LIKE ? OR s.address LIKE ?)`;

        const params = [`%${keyword}%`, `%${keyword}%`]; // Base parameters for search

        // Apply filtering criteria
        if (min_price) {
            query += " AND ? <= s.min_price";
            params.push(min_price);
        }
        if (max_price) {
            query += " AND ? >= s.max_price";
            params.push(max_price);
        }
        if (style && style.length > 0) {
            const stylePlaceholders = style.map(() => "?").join(", ");
            query += ` AND s.style IN (${stylePlaceholders})`;
            params.push(...style);
        }
        if (feature && feature.length > 0) {
            const featurePlaceholders = feature.map(() => "?").join(", ");
            query += ` AND f.features_name IN (${featurePlaceholders})`;
            params.push(...feature);
        }

        if (sortOption === "highest_rated") {
            query += " ORDER BY s.rate DESC";
        } else if (sortOption === "nearest_location") {
            query += "";
        } else {
            query += " ORDER BY s.rate DESC"; 
        }

        // Execute query
        const [rows] = await db.query(query, params);
        return rows;
    },
};

export default store;
