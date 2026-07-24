const express = require("express");
const cors = require("cors");

require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const expenseRoutes = require("./routes/expenseRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/expenses", expenseRoutes);

app.get("/", (req, res) => {

    res.send("Expense Tracker API is Running...");

});

module.exports = app;