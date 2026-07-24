import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";

import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);

const Summary = () => {

    const [expenses, setExpenses] = useState([]);

    useEffect(() => {

        loadExpenses();

    }, []);

    const loadExpenses = async () => {

        try {

            const res = await api.get("/expenses");

            setExpenses(res.data);

        }

        catch (error) {

            console.log(error);

        }

    };

    const totalSpent = expenses.reduce(

        (sum, expense) => sum + Number(expense.amount),

        0

    );

    const categoryTotals = {};

    expenses.forEach((expense) => {

        categoryTotals[expense.category] =

            (categoryTotals[expense.category] || 0)

            +

            Number(expense.amount);

    });

    const labels = Object.keys(categoryTotals);

    const values = Object.values(categoryTotals);

    const highestCategory = labels.length

        ?

        labels.reduce((a, b) =>

            categoryTotals[a] > categoryTotals[b]

                ? a

                : b

        )

        : "N/A";

    const chartData = {

        labels,

        datasets: [

            {

                label: "Expenses",

                data: values,

                backgroundColor: [

                    "#2563eb",

                    "#22c55e",

                    "#f97316",

                    "#ef4444",

                    "#8b5cf6",

                    "#06b6d4",

                    "#eab308",

                    "#ec4899"

                ],

                borderWidth: 1

            }

        ]

    };

    return (

        <>

            <Navbar />

            <div className="summary-page">

                <h1>

                    Expense Summary

                </h1>

                <div className="summary-grid">

                    <div className="summary-box">

                        <h3>Total Expenses</h3>

                        <h2>

                            {expenses.length}

                        </h2>

                    </div>

                    <div className="summary-box">

                        <h3>Total Spent</h3>

                        <h2>

                            ₹ {totalSpent}

                        </h2>

                    </div>

                    <div className="summary-box">

                        <h3>Highest Category</h3>

                        <h2>

                            {highestCategory}

                        </h2>

                    </div>

                </div>

                <div className="chart-card">

                    {

                        expenses.length === 0 ?

                        (

                            <h2>

                                No Expense Data Available

                            </h2>

                        )

                        :

                        (

                            <Pie data={chartData} />

                        )

                    }

                </div>

                <div className="category-summary">

                    <h2>

                        Category Wise Expenses

                    </h2>

                    {

                        labels.map((category) => (

                            <div
                                className="category-row"
                                key={category}
                            >

                                <span>

                                    {category}

                                </span>

                                <strong>

                                    ₹ {categoryTotals[category]}

                                </strong>

                            </div>

                        ))

                    }

                </div>

            </div>

        </>

    );

};

export default Summary;