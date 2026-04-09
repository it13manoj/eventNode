const { DataTypes } = require("sequelize");
const sequelize = require("../db/conenction");
const Category = require("./Category");

const SubCategory = sequelize.define("subcategories", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    categories_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Category,
            key: "id"
        }
    },
}, {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at"
});


SubCategory.belongsTo(Category, {
    foreignKey: "categories_id",
    as: "category"
});


module.exports = SubCategory;