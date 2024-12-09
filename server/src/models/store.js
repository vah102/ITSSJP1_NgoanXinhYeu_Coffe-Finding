import db from "../config/db.js";

const store = {
    getAll: async (userId) => {
        const [rows] = await db.query(`
            SELECT s.*
            FROM store s
            WHERE s.store_id NOT IN (
                SELECT bd.store_id
                FROM Blacklist_detail bd
                JOIN Blacklist b ON bd.blacklist_id = b.blacklist_id
                WHERE b.user_id = ?
            )`, [userId]);
        return rows;
    },

    getById: async (id) => {
        const [rows] = await db.query(`
            SELECT * 
            FROM store s
            WHERE s.store_id = ? 
            `, [id]);
        return rows;
    },

    getByHighRate: async (userId) => {
        const [rows] = await db.query(`
            SELECT * 
            FROM store s
            WHERE s.rate >= 4.0
            AND s.store_id NOT IN (
                SELECT bd.store_id
                FROM Blacklist_detail bd
                JOIN Blacklist b ON bd.blacklist_id = b.blacklist_id
                WHERE b.user_id = ?
            )`, [userId]);
        return rows;
    },

    sortByHighRate: async (userId) => {
        const [rows] = await db.query(`
            SELECT * 
            FROM store s
            WHERE s.rate >= 4.0
            AND s.store_id NOT IN (
                SELECT bd.store_id
                FROM Blacklist_detail bd
                JOIN Blacklist b ON bd.blacklist_id = b.blacklist_id
                WHERE b.user_id = ?
            )
            ORDER BY s.rate DESC`, [userId]);
        return rows;
    },

    search: async (keyword, userId) => {
        const [rows] = await db.query(`
            SELECT * 
            FROM store s
            WHERE (s.name LIKE ? OR s.address LIKE ?)
            AND s.store_id NOT IN (
                SELECT bd.store_id
                FROM Blacklist_detail bd
                JOIN Blacklist b ON bd.blacklist_id = b.blacklist_id
                WHERE b.user_id = ?
            )`, [`%${keyword}%`, `%${keyword}%`, userId]);
        return rows;
    },

    filter: async (filters, userId) => {
        const { min_price, max_price, style, feature } = filters;
        let query = `
            SELECT DISTINCT s.* 
            FROM store s
            LEFT JOIN Features_store fs ON s.store_id = fs.store_id
            LEFT JOIN Features f ON fs.feature_id = f.feature_id
            WHERE 1=1 
            AND s.store_id NOT IN (
                SELECT bd.store_id
                FROM Blacklist_detail bd
                JOIN Blacklist b ON bd.blacklist_id = b.blacklist_id
                WHERE b.user_id = ?
            )`;
        const params = [userId];

        if (min_price) {
            query += " AND s.min_price >= ?";
            params.push(min_price);
        }
        if (max_price) {
            query += " AND s.max_price <= ?";
            params.push(max_price);
        }

        if (style && style.length > 0) {
            const placeholders = style.map(() => "?").join(", ");
            query += ` AND s.style IN (${placeholders})`;
            params.push(...style);
        }

        if (feature && feature.length > 0) {
            query += ` AND f.features_name IN (?)`;
            params.push(feature);
        }

        const [rows] = await db.query(query, params);
        return rows;
    },

    searchAndFilter: async (keyword, filters, sortOption, userId) => {
        const { min_price, max_price, style, feature } = filters;
        let query = `
            SELECT DISTINCT s.* 
            FROM store s
            LEFT JOIN Features_store fs ON s.store_id = fs.store_id
            LEFT JOIN Features f ON fs.feature_id = f.feature_id
            WHERE (s.name LIKE ? OR s.address LIKE ?)
            AND s.store_id NOT IN (
                SELECT bd.store_id
                FROM Blacklist_detail bd
                JOIN Blacklist b ON bd.blacklist_id = b.blacklist_id
                WHERE b.user_id = ?
            )`;

        const params = [`%${keyword}%`, `%${keyword}%`, userId];

        if (min_price) {
            query += " AND s.min_price >= ?";
            params.push(min_price);
        }
        if (max_price) {
            query += " AND s.max_price <= ?";
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
            // Add sorting logic if necessary
        } else {
            query += " ORDER BY s.rate DESC"; 
        }

        const [rows] = await db.query(query, params);
        return rows;
    },
};

export default store;
