const { DataTypes } = require("sequelize");
const sequelize = require("../db/conenction");
const Category = require("./Category");
const SubCategory = require("./SubCategory");
const wareHouse = require("./WareHouse");

const Inventory = sequelize.define("invertories", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    width: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    height: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    color: {
        type: DataTypes.STRING,
        allowNull: true
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    quality: {
        type: DataTypes.STRING,
        allowNull: true
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: true
    },

    ware_house_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: wareHouse,
            key: "id"
        }
    },
    categories_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Category,
            key: "id"
        }
    },

    sub_categories_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: SubCategory,
            key: "id"
        }
    },
}, {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at"
});


Inventory.belongsTo(Category, {
    foreignKey: "categories_id",
    as: "categories"
});

Inventory.belongsTo(SubCategory, {
    foreignKey: "sub_categories_id",
    as: "subCategories"
});

Inventory.belongsTo(wareHouse, {
    foreignKey: "ware_house_id",
    as: "WareHouse"
});

module.exports = Inventory;