const Events = require("../../model/Events");
const { ERROR } = require("../../Response/Error");
const { SUCCESS } = require("../../Response/Success");
const { Op, fn, col } = require("sequelize");
const Design = require("../../model/Design");
const BookedEvents = require("../../model/BookedEvents");
const sequelize = require("../../db/conenction");


exports.create = async (req, res) => {
    const t = await sequelize.transaction();

    try {
        const {
            c_name, vanus, doe, v_location, v_a_d, nodb, pob,
            tc, sr, amount, status,
            categories_id, sub_categories_id,
            designName, bookedItems
        } = req.body;

        // ✅ 1. Find or Create Design
        const [design] = await Design.findOrCreate({
            where: { design_name: designName },
            defaults: { design_name: designName },
            transaction: t
        });

        const designId = design.id;

        // ✅ 2. Create Event
        const event = await Events.create({
            design_id: designId,
            c_name,
            vanus,
            doe,
            v_location,
            v_a_d,
            nodb,
            pob,
            tc,
            sr,
            amount,
            status,
            categories_id,
            sub_categories_id
        }, { transaction: t });

        const eventId = event.id; // ✅ FIXED

        // ✅ 3. Prepare Items
        const itemsPayload = bookedItems.map((item) => ({
            event_id: eventId,
            categories_id: item.categories.id,
            categories_name:item.categories.name,
            subCategories_id: item.subCategories.id,
            subCategories_name: item.subCategories.name,
            qt: item.subCategories.is_enable ? 0 : item.inputs.value,
            width: item.subCategories.is_enable ? item.inputs.width : 0,
            height: item.subCategories.is_enable ? item.inputs.height : 0,
        }));

        // ✅ 4. Insert Items
        await BookedEvents.bulkCreate(itemsPayload, { transaction: t });

        // ✅ 5. Commit Transaction
        await t.commit();

        res.send(SUCCESS("Successfully Event Created", event));

    } catch (error) {
        // ❌ Rollback on failure
        await t.rollback();

        console.error(error);
        res.send(ERROR(error));
    }
};

const findDesing = async (req, res) => {
    try {
        const result = await Design.findAll({
            order: [['id', 'DESC']]
        })
        res.send(SUCCESS("Records", result))
    } catch (error) {
        res.send(ERROR(error))
    }
}


exports.findEventBookedItems = async (req, res) => {
    try {
        const {id} = req.params
        const result = await BookedEvents.findAll({
            where:{event_id:id},
            order: [['id', 'DESC']]
        })
        res.send(SUCCESS("Records", result))
    } catch (error) {
        res.send(ERROR(error))
    }
}

exports.getDesign = async (req,res)=>{
       try {
        const result = await Design.findAll({
            order: [['id', 'DESC']]
        })
        res.send(SUCCESS("Records", result))
    } catch (error) {
        res.send(ERROR(error))
    }
}

exports.update = async (req, res) => {
    try {
        const { id } = req.params
        const { c_name, vanus, doe, v_location, v_a_d, nodb, pob, tc, sr, amount, status, width, height, quntites, categories_id, sub_categories_id } = req.body;
        const result = await Events.update({
            c_name, vanus, doe, v_location, v_a_d, nodb, pob, tc, sr, amount, categories_id, sub_categories_id
        }, {
            where: {
                id: id
            }
        })
        res.send(SUCCESS("Successfully Event update", result))
    } catch (error) {
        res.send(ERROR(error))
    }
}


exports.find = async (req, res) => {
    try {
        const result = await Events.findAll({
            // include:[{
            //          model: BookedEvents,
            //          as : "event_id"
            // }],
            order: [['id', 'DESC']]
        })
        res.send(SUCCESS("Records", result))
    } catch (error) {
        res.send(ERROR(error))
    }
}

exports.findByPk = async (req, res) => {
    try {
        const { id } = req.params
        const result = await Events.findByPk(id)
        res.send(SUCCESS("Records", result))
    } catch (error) {
        res.send(ERROR(error))
    }
}

exports.updateStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body
        const result = await Events.update({
            status
        }, {
            where: { id: id }
        })
        res.send(SUCCESS("Successfully Event update", result))
    } catch (error) {
        res.send(ERROR(error))
    }
}




exports.calculate = async (req, res) => {
    try {
        const { date, num, catid, scatid } = req.params;

        // 🔹 Start Date (00:00:00)
        const startDate = new Date(date);
        startDate.setHours(0, 0, 0, 0);

        // 🔹 End Date (add num days → 23:59:59)
        const endDate = new Date(date);
        endDate.setDate(endDate.getDate() + Number(num));
        endDate.setHours(23, 59, 59, 999);

        // 🔥 IMPORTANT: Adjust backward (assume max 3-day event)
        const adjustedStart = new Date(startDate);
        adjustedStart.setDate(adjustedStart.getDate() - 3);

        console.log("Search Start:", startDate);
        console.log("Search End:", endDate);
        console.log("Adjusted Start:", adjustedStart);

        const whereCondition = {
            doe: {
                [Op.between]: [adjustedStart, endDate],
            },
            categories_id: catid,
            sub_categories_id: scatid,
        };

        // ✅ Single query (optimized)
        const result = await Events.findOne({
            attributes: [
                [fn("SUM", col("quntites")), "totalQty"],
                [fn("SUM", col("width")), "totalWidth"],
                [fn("SUM", col("height")), "totalHeight"],
            ],
            where: whereCondition,
            raw: true,
            logging: console.log,
        });

        res.json({
            quntites: result?.totalQty ?? 0,
            width: result?.totalWidth ?? 0,
            height: result?.totalHeight ?? 0,
        });

    } catch (err) {
        console.error("ERROR:", err);
        res.status(500).json({ error: err.message });
    }
};