const Events = require("../../model/Events");
const { ERROR } = require("../../Response/Error");
const { SUCCESS } = require("../../Response/Success");
const { Op } = require('sequelize');


exports.create = async (req, res) => {
    try {
        const { c_name, vanus, doe, v_location, v_a_d, nodb, pob, tc, sr, amount } = req.body;
        const result = await Events.create({
            c_name, vanus, doe, v_location, v_a_d, nodb, pob, tc, sr, amount
        })
        res.send(SUCCESS("Successfully Event Created", result))
    } catch (error) {
        res.send(ERROR(error))
    }
}



exports.update = async (req, res) => {
    try {
        const { id } = req.params
        const { c_name, vanus, doe, v_location, v_a_d, nodb, pob, tc, sr, amount } = req.body;
        const result = await Events.update({
            c_name, vanus, doe, v_location, v_a_d, nodb, pob, tc, sr, amount
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

    // Start date (00:00:00)
    const startDate = new Date(date);
    startDate.setHours(0, 0, 0, 0);

    // End date (23:59:59)
    const endDate = new Date(date);
    endDate.setDate(endDate.getDate() + Number(num));
    endDate.setHours(23, 59, 59, 999);

    const whereCondition = {
      doe: {
        [Op.between]: [startDate, endDate],
      },
      categories_id: catid,
      sub_categories_id: scatid,
    };

    const quntites = await Events.sum("quntites", {
      where: whereCondition,
      logging: console.log,
    });

    const totalWidth = await Events.sum("width", {
      where: whereCondition,
    });

    const totalHeight = await Events.sum("height", {
      where: whereCondition,
    });

    console.log("Total Quantities:", quntites ?? 0);

    res.json({
      quntites: quntites ?? 0,
      height: totalHeight ?? 0,
      width: totalWidth ?? 0,
    });
  } catch (err) {
    console.error("ERROR:", err); // 👈 important
    res.status(500).json({ error: err.message });
  }
};