const db = require("../config/db");

const getAllExpenses = (userId, callback) => {

    db.query(

        "SELECT * FROM expenses WHERE user_id=? ORDER BY expense_date DESC",

        [userId],

        callback

    );

};

const getExpenseById = (id, callback) => {

    db.query(

        "SELECT * FROM expenses WHERE id=?",

        [id],

        callback

    );

};

const addExpense = (expense, callback) => {

    const sql =
        `
        INSERT INTO expenses
        (
            title,
            amount,
            category,
            expense_date,
            description,
            user_id
        )

        VALUES(?,?,?,?,?,?)
        `;

    db.query(

        sql,

        [

            expense.title,
            expense.amount,
            expense.category,
            expense.expense_date,
            expense.description,
            expense.user_id

        ],

        callback

    );

};

const updateExpense = (expense, callback) => {

    const sql =
        `
        UPDATE expenses

        SET

        title=?,
        amount=?,
        category=?,
        expense_date=?,
        description=?

        WHERE id=?
        `;

    db.query(

        sql,

        [

            expense.title,
            expense.amount,
            expense.category,
            expense.expense_date,
            expense.description,
            expense.id

        ],

        callback

    );

};

const deleteExpense = (id, callback) => {

    db.query(

        "DELETE FROM expenses WHERE id=?",

        [id],

        callback

    );

};

module.exports = {

    getAllExpenses,
    getExpenseById,
    addExpense,
    updateExpense,
    deleteExpense

};