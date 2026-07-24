import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../services/api";

const Reports = () => {

    const navigate = useNavigate();

    const [expenses, setExpenses] = useState([]);

    const [search, setSearch] = useState("");

    const [category, setCategory] = useState("All");

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetchExpenses();

    }, []);

    const fetchExpenses = async () => {

        try {

            const res = await api.get("/expenses");

            setExpenses(res.data);

        }

        catch (err) {

            console.log(err);

        }

        finally {

            setLoading(false);

        }

    };

    const deleteExpense = async (id) => {

        const confirmDelete = window.confirm(
            "Delete this expense?"
        );

        if (!confirmDelete) return;

        try {

            await api.delete(`/expenses/${id}`);

            setExpenses(expenses.filter((expense) => expense.id !== id));

            alert("Expense Deleted Successfully");

        }

        catch (err) {

            console.log(err);

            alert("Unable to delete expense");

        }

    };

    const filteredExpenses = useMemo(() => {

        return expenses.filter((expense) => {

            const titleMatch = expense.title
                .toLowerCase()
                .includes(search.toLowerCase());

            const categoryMatch =
                category === "All"
                    ? true
                    : expense.category === category;

            return titleMatch && categoryMatch;

        });

    }, [expenses, search, category]);

    const totalAmount = filteredExpenses.reduce(

        (sum, expense) => sum + Number(expense.amount),

        0

    );

    return (

        <>

            <Navbar />

            <div className="reports-container">

                <div className="reports-header">

                    <h1>All Expenses</h1>

                    <button
                        className="add-new-btn"
                        onClick={() => navigate("/add-expense")}
                    >

                        + Add Expense

                    </button>

                </div>

                <div className="filter-section">

                    <input
                        type="text"
                        placeholder="Search by Title..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                    />

                    <select
                        value={category}
                        onChange={(e) =>
                            setCategory(e.target.value)
                        }
                    >

                        <option value="All">All Categories</option>

                        <option value="Food">Food</option>

                        <option value="Travel">Travel</option>

                        <option value="Shopping">Shopping</option>

                        <option value="Bills">Bills</option>

                        <option value="Health">Health</option>

                        <option value="Education">Education</option>

                        <option value="Entertainment">Entertainment</option>

                        <option value="Other">Other</option>

                    </select>

                </div>

                <div className="total-box">

                    <h2>

                        Total Expenses : ₹ {totalAmount}

                    </h2>

                </div>

                <div className="table-container">

                    <table>

                        <thead>

                            <tr>

                                <th>Title</th>

                                <th>Category</th>

                                <th>Amount</th>

                                <th>Date</th>

                                <th>Description</th>

                                <th>Actions</th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                loading ?

                                (

                                    <tr>

                                        <td colSpan="6">

                                            Loading...

                                        </td>

                                    </tr>

                                )

                                :

                                filteredExpenses.length === 0 ?

                                (

                                    <tr>

                                        <td colSpan="6">

                                            No Expenses Found

                                        </td>

                                    </tr>

                                )

                                :

                                (

                                    filteredExpenses.map((expense) => (

                                        <tr key={expense.id}>

                                            <td>

                                                {expense.title}

                                            </td>

                                            <td>

                                                {expense.category}

                                            </td>

                                            <td>

                                                ₹ {expense.amount}

                                            </td>

                                            <td>

                                                {expense.expense_date}

                                            </td>

                                            <td>

                                                {

                                                    expense.description ||

                                                    "-"

                                                }

                                            </td>

                                            <td>

                                                <button
                                                    className="edit-btn"
                                                    onClick={() =>
                                                        navigate(
                                                            `/edit-expense/${expense.id}`
                                                        )
                                                    }
                                                >

                                                    Edit

                                                </button>

                                                <button
                                                    className="delete-btn"
                                                    onClick={() =>
                                                        deleteExpense(
                                                            expense.id
                                                        )
                                                    }
                                                >

                                                    Delete

                                                </button>

                                            </td>

                                        </tr>

                                    ))

                                )

                            }

                        </tbody>

                    </table>

                </div>

            </div>

        </>

    );

};

export default Reports;