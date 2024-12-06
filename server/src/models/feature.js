import db from "../config/db.js";

const feature = {
    getByStoreId: async (storeId) => {
        const query = `
        SELECT 
            f.feature_id, 
            f.features_name 
        FROM 
            Features_store fs
        INNER JOIN 
            Features f ON fs.feature_id = f.feature_id
        WHERE 
            fs.store_id = ?;
        `;
        try {
            const [rows] = await db.query(query, [storeId]);
            return rows;
        } catch (error) {
            console.error("Error fetching features by store ID:", error);
            throw error;
        }
    },
};

export default feature;
