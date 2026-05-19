const Salary = require("../../model/Salary")
const { ERROR } = require("../../Response/Error")
const { SUCCESS } = require("../../Response/Success")

exports.create = async (req, res)=>{
    
    try {
        const { paid, remaing, user_id, extra_pay} = req.body
        const result = await Salary.create({
            paid, remaing, extra_pay, user_id
        })
        res.send(SUCCESS("recoreds", result));
    } catch (error) {
        res.send(ERROR(error))
    }
}



exports.findByid =  async (req,res) =>{
    try {
        const {id} = req.params;
        const result = await Salary.findByPk(id);
        res.send(SUCCESS("recoreds", result));
    } catch (error) {
        res.send(ERROR(error))
    }
}


exports.findAll = async ( req, res) =>{
    try {
        const result = await Salary.findAll({
            order:[["id","desc"]]
        })
        res.send(SUCCESS("recoreds", result) )
    } catch (error) {
        res.send(ERROR(error))
    }
}