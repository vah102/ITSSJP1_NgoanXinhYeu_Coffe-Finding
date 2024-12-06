import db from "../config/db.js";

const menu = {
    getMenuDetailsbyStoreId: async (storeId) => {
        const query = `
        SELECT 
            md.id AS menu_detail_id,
            md.menu_id,
            md.dish_name,
            md.dish_price,
            md.dish_image,
            md.description
        FROM 
            MenuDetail md
        INNER JOIN 
            Menu m ON md.menu_id = m.menu_id
        WHERE 
            m.store_id = ?;
    `;
    try {
        const [rows] = await db.query(query, [storeId]);
        return rows;
    } catch (error) {
        console.error('Error fetching MenuDetails:', error);
        throw error;
    }
    },
    
};

export default menu;