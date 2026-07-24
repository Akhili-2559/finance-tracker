const db = require("../config/db");

const createUser = (user, callback) => {

    const sql = `
        INSERT INTO users(username, password)
        VALUES(?, ?)
    `;

    db.query(

        sql,

        [

            user.username,

            user.password

        ],

        callback

    );

};

const findUserByUsername = (username, callback) => {

    db.query(

        "SELECT * FROM users WHERE username = ?",

        [username],

        callback

    );

};

const findUserById = (id, callback) => {

    db.query(

        "SELECT * FROM users WHERE id = ?",

        [id],

        callback

    );

};

module.exports = {

    createUser,

    findUserByUsername,

    findUserById

};