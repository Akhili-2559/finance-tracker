const expenseModel = require("../models/expenseModel");

const getAllExpenses = (req, res) => {

    expenseModel.getAllExpenses(req.user.id, (err, result) => {

        if (err) {

            return res.status(500).json(err);

        }

        res.json(result);

    });

};

const getExpenseById = (req, res) => {

    expenseModel.getExpenseById(req.params.id, (err, result) => {

        if (err) {

            return res.status(500).json(err);

        }

        res.json(result);

    });

};

const addExpense = (req, res) => {

    const {

        title,
        amount,
        category,
        expense_date,
        description

    } = req.body;

    const expense = {

        title,
        amount,
        category,
        expense_date,
        description,
        user_id: req.user.id

    };

    expenseModel.addExpense(expense, (err) => {

        if (err) {

            return res.status(500).json(err);

        }

        res.status(201).json({

            message: "Expense Added Successfully"

        });

    });

};

const updateExpense = (req, res) => {

    const expense = {

        id: req.params.id,

        title: req.body.title,

        amount: req.body.amount,

        category: req.body.category,

        expense_date: req.body.expense_date,

        description: req.body.description

    };

    expenseModel.updateExpense(expense, (err) => {

        if (err) {

            return res.status(500).json(err);

        }

        res.json({

            message: "Expense Updated Successfully"

        });

    });

};

const deleteExpense = (req, res) => {

    expenseModel.deleteExpense(req.params.id, (err) => {

        if (err) {

            return res.status(500).json(err);

        }

        res.json({

            message: "Expense Deleted Successfully"

        });

    });

};

module.exports = {

    getAllExpenses,
    getExpenseById,
    addExpense,
    updateExpense,
    deleteExpense

};