const Role = require("../../model/Role");
const { ERROR } = require("../../Response/Error");
const { SUCCESS } = require("../../Response/Success");


exports.create = async (req, res) => {
    try {
        const { role_name } = req.body
        const role = await Role.create({ role_name: role_name })
        res.send(SUCCESS("new role inserted", ""))
    } catch (err) {
        res.send(ERROR(err))
    }
}

exports.role = async (req,res) =>{
        try{
            const role = await Role.findAll();
             res.send(SUCCESS("records", role))
        }catch(err){
             res.send(ERROR(err))
        }
}