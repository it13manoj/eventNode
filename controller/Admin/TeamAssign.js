const Events = require("../../model/Events");
const TeamAssign = require("../../model/TeamAssign");
const TeamAssignUser = require("../../model/TeamAssignUser");
const User = require("../../model/User");



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
            location,
            installation,
            stockLocation,
        } = req.body;

        const event = await TeamAssign.create({
            inventoryCategory,
            inventorySubcategories,
            event_id,
            date,
            time,
            venue,
            location,
            installation,
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


exports.find = async (req, res) => {
    try {
        const { id } = req.params;

        const event = await TeamAssign.findOne({
            where: { event_id: id },
            include: [{
                model: TeamAssignUser,
                as: "TeamAssignUser",
               
            }],
              order:[["id","desc"]]
        });

        await Events.update({
            status:"1",
            where:{
                id:id
            }
        })


        res.json({ success: true, data: event });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};