const TeamAssign = require("../../model/TeamAssign");
const TeamAssignUser = require("../../model/TeamAssignUser")
const Events = require("../../model/Events");
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
        await Events.update(
            { status: "1" },   // values to update
            {
                where: {
                    id: event_id
                }
            }
        );


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
            include: [
                {
                    model: TeamAssignUser,
                    as: "TeamAssignUser",
                    include: [
                        {
                            model: User,
                            as: "users"
                        }
                    ]
                }
            ],
            order: [["id", "desc"]]
        });



        res.json({ success: true, data: event });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};