import db from '../config/db.js';

const store = {
    getAll: async () => {
      const [rows] = await db.query('SELECT * FROM store');
      return rows;
    },
  
    getById: async (id) => {
      const [rows] = await db.query('SELECT * FROM stores WHERE store_id = ?', [id]);
      return rows;
    },
    getByHighRate: async () => {
      const [rows] = await db.query('SELECT * FROM store WHERE rate >= 4.0');
      return rows;
    },
    sortByHighRate: async () => {
      const [rows] = await db.query('SELECT * FROM store WHERE rate >= 4.0 ORDER BY rate DESC');
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
    
  };
  
export default store;