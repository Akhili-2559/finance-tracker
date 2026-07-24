import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import SummaryCard from "../components/SummaryCard";
import ExpenseCard from "../components/ExpenseCard";
import api from "../services/api";

const Dashboard = () => {

    const [expenses, setExpenses] = useState([]);

    const [loading, setLoading] = useState(true);

    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {

        loadExpenses();

    }, []);

    const loadExpenses = async () => {

        try {

            const res = await api.get("/expenses");

            setExpenses(res.data);

        } catch (err) {

            console.log(err);

        } finally {

            setLoading(false);

        }

    };

    const totalSpent = expenses.reduce(

        (sum, expense) => sum + Number(expense.amount),

        0

    );

    const categoryTotals = {};

    expenses.forEach((expense) => {

        categoryTotals[expense.category] =

            (categoryTotals[expense.category] || 0) +

            Number(expense.amount);

    });

    const recentExpenses = [...expenses]

        .sort((a, b) => new Date(b.expense_date) - new Date(a.expense_date))

        .slice(0, 5);

    return (

        <>

            <Navbar />

            <div className="dashboard-container">

                <h1 className="welcome-title">

                    Welcome, {user?.username || "User"} 👋

                </h1>

                <div className="dashboard-grid">

                    <SummaryCard

                        title="Total Spent"

                        value={`₹ ${totalSpent}`}

                        icon="💰"

                        color="#2563eb"

                    />

                    <div className="dashboard-card">

                        <h2>Category Snapshot</h2>

                        {

                            Object.keys(categoryTotals).length === 0

                                ?

                                <p>No categories yet</p>

                                :

                                Object.entries(categoryTotals).map(

                                    ([category, amount]) => (

                                        <div

                                            key={category}

                                            className="category-item"

                                        >

                                            <span>{category}</span>

                                            <strong>₹ {amount}</strong>

                                        </div>

                                    )

                                )

                        }

                    </div>

                    <div className="dashboard-card">

                        <h2>Recent Expenses</h2>

                        {

                            recentExpenses.length === 0

                                ?

                                <p>No recent expenses</p>

                                :

                                recentExpenses.map((expense) => (

                                    <ExpenseCard

                                        key={expense.id}

                                        expense={expense}

                                    />

                                ))

                        }

                    </div>

                </div>

            </div>

        </>

    );

};

export default Dashboard;