const { DataTypes } = require("sequelize");
const sequelize = require("../db/conenction");
const User = require("./User");
const TeamAssignUser = require("./TeamAssignUser");
const Events = require("./Events");
const Category = require("./Category");
const SubCategory = require("./SubCategory");
const Inventory = require("./Inventory");


const TeamAssign = sequelize.define(
    "TeamAssign",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        inventoryCategory: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Category,
                key: "id",
            },
        },

        inventorySubcategories: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: SubCategory,
                key: "id",
            },
        },
        event_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Events,
                key: "id",
            },
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },

        time: {
            type: DataTypes.TIME,
            allowNull: false,
        },
        stockLocation: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Inventory,
                key: "id",
            },
        }
    }, {
    tableName: "team_assigns",
    timestamps: true,
})


// TeamAssign.hasMany(TeamAssignUser, {
//   foreignKey: "team_assign_id",
//   as: "TeamAssignUser"
// });



module.exports = TeamAssign;
