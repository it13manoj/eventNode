const Events = require("../../model/Events");
const { ERROR } = require("../../Response/Error");
const { SUCCESS } = require("../../Response/Success");



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
        const {id } = req.params
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