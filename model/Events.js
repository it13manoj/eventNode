const { DataTypes } = require("sequelize");
const sequelize = require("../db/conenction");
const Category = require("./Category");
const SubCategory = require("./SubCategory");


const Events = sequelize.define("events", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    c_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    vanus: {
        type: DataTypes.STRING,
        allowNull: false
    },
    doe: {
        type: DataTypes.DATE,
        allowNull: false
    },
    v_location: {
        type: DataTypes.STRING,
        allowNull: false
    },
    v_a_d: {
        type: DataTypes.DATE,
        allowNull: false
    },
    nodb: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    pob: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tc: {
        type: DataTypes.STRING,
        allowNull: false
    },
    sr: {
        type: DataTypes.STRING,
        allowNull: false
    },
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    categories_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Category,
            key: "id",
        },
    },
    sub_categories_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: SubCategory,
            key: "id",
        },
    },
    quntites: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    width: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    height: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    status: {
        type: DataTypes.ENUM("0", "1", "2", "3", "4"),
        defaultValue: "1",
        allowNull: false
    },

}, {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at"
});


module.exports = Events;