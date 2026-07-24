const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userModel = require("../models/userModel");

const register = async (req, res) => {

    try {

        const { username, password } = req.body;

        if (!username || !password) {

            return res.status(400).json({
                message: "Username and Password are required"
            });

        }

        userModel.findUserByUsername(username, async (err, result) => {

            if (err) {

                return res.status(500).json(err);

            }

            if (result.length > 0) {

                return res.status(400).json({
                    message: "Username already exists"
                });

            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = {

                username,

                password: hashedPassword

            };

            userModel.createUser(newUser, (err) => {

                if (err) {

                    return res.status(500).json(err);

                }

                return res.status(201).json({

                    message: "Registration Successful"

                });

            });

        });

    } catch (error) {

        return res.status(500).json({

            message: "Server Error"

        });

    }

};

const login = (req, res) => {

    const { username, password } = req.body;

    if (!username || !password) {

        return res.status(400).json({

            message: "Username and Password are required"

        });

    }

    userModel.findUserByUsername(username, async (err, result) => {

        if (err) {

            return res.status(500).json(err);

        }

        if (result.length === 0) {

            return res.status(404).json({

                message: "User not found"

            });

        }

        const user = result[0];

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {

            return res.status(401).json({

                message: "Invalid Password"

            });

        }

        const token = jwt.sign(

            {

                id: user.id,

                username: user.username

            },

            process.env.JWT_SECRET,

            {

                expiresIn: "1d"

            }

        );

        res.status(200).json({

            message: "Login Successful",

            token,

            user: {

                id: user.id,

                username: user.username

            }

        });

    });

};

module.exports = {

    register,

    login

};