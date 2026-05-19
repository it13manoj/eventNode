const { DataTypes } = require("sequelize");
const sequelize = require("../db/conenction");


const BookedEvents = sequelize.define("booked_events", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    categories_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    categories_name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    subCategories_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    subCategories_name: {
        type: DataTypes.STRING,
        allowNull: true
    },

    width: {
        type: DataTypes.STRING,
        allowNull: true
    },

    height: {
        type: DataTypes.STRING,
        allowNull: true
    },
    qt: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    event_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },


}, {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at"
});




module.exports = BookedEvents;