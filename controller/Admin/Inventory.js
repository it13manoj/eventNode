const Category = require("../../model/Category")
const Inventories = require("../../model/Inventory")
const SubCategory = require("../../model/SubCategory")
const { ERROR } = require("../../Response/Error")
const { SUCCESS } = require("../../Response/Success")


exports.create = async (req, res) => {
    try {
        const { width, height, color, quantity, quality, price, categories_id, sub_categories_id } = req.body
        const results = await Inventories.create({
            width, height, color, quantity, quality, price, categories_id, sub_categories_id
        })
        res.send(SUCCESS("Successfully Created!", results))
    } catch (error) {
        res.send(ERROR(error))
    }
}

exports.update = async (req, res) => {
    try {
        const { id } = req.params
        const { width, height, color, quantity, quality, price, categories_id, sub_categories_id } = req.body
        const results = await Inventories.update({
            width, height, color, quantity, quality, price, categories_id, sub_categories_id
        }, {
            where: {
                id: id
            }
        })
        res.send(SUCCESS("Successfully Update!", results))
    } catch (error) {
        res.send(ERROR(error))
    }
}

exports.find = async (req, res) => {
    try {
        const results = await Inventories.findAll({
            attributes: [
                'id',
                'width',
                'height',
                'color',
                'quantity',
                'quality',
                'price',
                'categories_id',
                'sub_categories_id'
            ],
            include: [
                {
                    model: Category,
                    as: "categories"
                },
                {
                    model: SubCategory,
                    as: "subCategories"
                }
            ]
        });

        res.send(SUCCESS("Successfully!", results));
    } catch (error) {
        res.send(ERROR(error));
    }
};
exports.findByPk = async (req, res) => {
    try {
        const { id } = req.params
        const results = await Inventories.findByPk(id)
        res.send(SUCCESS("Successfully!", results))
    } catch (error) {
        res.send(ERROR(error))
    }
}


exports.findBycategories = async (req, res) => {
    try {
        const { id } = req.params
        const results = await Inventories.findAll({
            attributes: [
                'id',
                'width',
                'height',
                'color',
                'quantity',
                'quality',
                'price',
                'categories_id',
                'sub_categories_id'
            ],
            include: [
                {
                    model: Category,
                    as: "categories"
                },
                {
                    model: SubCategory,
                    as: "subCategories"
                }
            ],
            where: {
                categories_id: id
            }
        })
        res.send(SUCCESS("Successfully!", results))
    } catch (error) {
        res.send(ERROR(error))
    }
}

exports.deletes = async (req, res) => {
    try {
        const { id } = req.params
        const results = await Inventories.destroy({
            where: {
                id: id
            }
        })
        res.send(SUCCESS("Successfully!", results))
    } catch (error) {
        res.send(ERROR(error))
    }
}