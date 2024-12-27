import { Sequelize } from "sequelize";

const sequelize = new Sequelize("itss", "root", "Tink60nhungle", {
    host: "localhost",
    dialect: "mysql",
    logging: false, // Tắt log nếu không cần
});

export default sequelize;
