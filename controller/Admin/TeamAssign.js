const TeamAssign = require("../../model/TeamAssign");
const TeamAssignUser = require("../../model/TeamAssignUser")



exports.createTeamAssign = async (req, res) => {
    try {
        const {
            employees, // [1,2,3]
            inventoryCategory,
            inventorySubcategories,
            event_id,
            date,
            time,
            venue,
            stockLocation,
        } = req.body;

        const event = await TeamAssign.create({
            inventoryCategory,
            inventorySubcategories,
            event_id,
            date,
            time,
            venue,
            stockLocation,
        });

        const data = employees.map((id) => ({
            user_id: id,
            event_id: event_id,
            team_assign_id: event.id,
        }));

        const assigenTeams = await TeamAssignUser.bulkCreate(data);

        res.json({ success: true, data: event });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};