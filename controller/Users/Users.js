const User = require("../../model/User");
const { ERROR } = require("../../Response/Error");
const { SUCCESS } = require("../../Response/Success");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Role = require("../../model/Role");

exports.create = async (req, res) => {
    try {
        const { fname, lname, email, contact, password } = req.body
        const users = await User.create({
            name: fname + " " + lname,
            contact: contact,
            email: email,
            password: password,
        },{logging: console.log })
        res.send(SUCCESS("Successfully register user", users))
    } catch (err) {
        res.send(ERROR("Not match data" + err));
    }
}


exports.users = async (req, res) => {
    try {
        const usersRecords = await User.findAll({
            attributes: {
                exclude: ["password"]
            }
        });
        res.send(SUCCESS("User Records", usersRecords));
    } catch (err) {
        res.send(ERROR(err))
    }
}


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({
            where: { email: email }
        });

        if (!user) {
            return res.send(ERROR("user not found!"));
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.send(ERROR("Invalid password"));
        }
        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.SECERET_KEY || "secretkey",
            { expiresIn: "1d" }
        );

        res.send(SUCCESS("Login successful", {
            token: token,
            user: {
                id: user.id,
                email: user.email
            }
        }))
    } catch (err) {
        return res.send(ERROR(err.message));
    }
};


exports.update = async (req, res) => {
    try {
        const { id } = req.user;
        const { job, dob, gender, address, city, state, pincode } = req.body
        const img = req.file ? req.file.filename : null;
        const updateProfile = await User.update(
            {
                job,
                dob,
                gender,
                address,
                city,
                state,
                pincode,
                img
            },
            {
                where: { id: id }
            }
        )
        res.send(SUCCESS("successfully update recoreds", updateProfile))
    } catch (err) {
        res.send(err)
    }
}
exports.findByPk = async (req, res) => {
    try {

        const { id } = req.users;

        const usersRecords = await User.findByPk();

        res.send(SUCCESS("User Records", usersRecords));

    } catch (err) {
        res.send(ERROR(err));
    }
};