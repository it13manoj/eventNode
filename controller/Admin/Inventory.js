const Category = require("../../model/Category")
const Inventories = require("../../model/Inventory")
const SubCategory = require("../../model/SubCategory")
const wareHouse = require("../../model/WareHouse")
const { ERROR } = require("../../Response/Error")
const { SUCCESS } = require("../../Response/Success")


exports.create = async (req, res) => {
    try {
        const { width, height, color, quantity, quality, price, categories_id, sub_categories_id, ware_house_id } = req.body
        const results = await Inventories.create({
            width, height, color, quantity, quality, price, categories_id, sub_categories_id, ware_house_id
        })
        res.send(SUCCESS("Successfully Created!", results))
    } catch (error) {
        res.send(ERROR(error))
    }
}

exports.update = async (req, res) => {
    try {
        const { id } = req.params
        const { width, height, color, quantity, quality, price, categories_id, sub_categories_id, ware_house_id } = req.body
        const results = await Inventories.update({
            width, height, color, quantity, quality, price, categories_id, sub_categories_id, ware_house_id
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
                'sub_categories_id',
                'ware_house_id'
            ],
            include: [
                {
                    model: Category,
                    as: "categories"
                },
                {
                    model: SubCategory,
                    as: "subCategories"
                },
                {
                    model: wareHouse,
                    as: "WareHouse"
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
                },
                {
                    model: wareHouse,
                    as: "WareHouse"
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


exports.findBycategoriesAndSubCategories = async (req, res) => {
    try {
        const { cid, sid } = req.params
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
                },
                {
                    model: wareHouse,
                    as: "WareHouse"
                }
            ],
            where: {
                categories_id: cid,
                sub_categories_id: sid
            }
        })
        res.send(SUCCESS("Successfully!", results))
    } catch (error) {
        res.send(ERROR(error))
    }
}


exports.calculate = async (req, res) => {
    try {
        const { catId, scatId } = req.params;

        console.log(req.params);

        const quntites = await Inventories.sum('quantity', {
            where: {
                categories_id: catId,
                sub_categories_id: scatId,
                width: null,
                height: null
            }
        });

        const totalHeight = await Inventories.sum('height', {
            where: {
                categories_id: catId,
                sub_categories_id: scatId,
            }
        });

        const totalWidth = await Inventories.sum('width', {
            where: {
                categories_id: catId,
                sub_categories_id: scatId,
            }
        });

        res.json({
            quntites: quntites,
            height: totalHeight,
            width: totalWidth
        });
    } catch (err) {
        console.error(err);
        res.send("failed");
    }
};




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