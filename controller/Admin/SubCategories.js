const SubCategories = require("../../model/SubCategory")
const { ERROR } = require("../../Response/Error")
const { SUCCESS } = require("../../Response/Success")


exports.create = async (req,res) =>{
    try{
            const { name, categories_id} = req.body
            const subCategories = await SubCategories.create({
                name:name,
                categories_id:categories_id
            })

            res.send(SUCCESS("Successfully Created SubCategories!", subCategories))
    }catch(error){
        res.send(ERROR(error))
    }
}

exports.finds = async (req,res) =>{
        try{
            const { id } = req.body
             const subCategories = await SubCategories.findAll({
                where:{id:id}
             })
             res.send(SUCCESS("Records",subCategories))
        }catch(error){
            res.send(ERROR(error))
        }
}

exports.updates = async (req,res) =>{
    try{
         const {id} = req.params
         const {name, categories_id} = req.body
         const subCategories = await SubCategories.update({
            name:name, categories_id:categories_id
         },{
            where:{id:id}
         })
         res.send(SUCCESS("Successfully updated! ", subCategories))
    }catch(error){
            res.send(ERROR(error))
    }
}


exports.deletes = async (req,res) =>{
        try{
            const {id} = req.params
            const subCategories = await SubCategories.destroy({
                where:{id:id}
            })
            res.send(SUCCESS("SubCategory deleted", subCategories))
        }catch(error){
                res.send(ERROR(error))
        }
}