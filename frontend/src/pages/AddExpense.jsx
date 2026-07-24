import { useState } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";

const AddExpense = () => {

    const [successMessage, setSuccessMessage] = useState("");

    const [expense, setExpense] = useState({

        title: "",

        amount: "",

        category: "",

        expense_date: "",

        description: ""

    });

    const handleChange = (e) => {

        setExpense({

            ...expense,

            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await api.post("/expenses", expense);

            setSuccessMessage("✅ Expense Added Successfully");

            setExpense({

                title: "",

                amount: "",

                category: "",

                expense_date: "",

                description: ""

            });

            setTimeout(() => {

                setSuccessMessage("");

            }, 3000);

        }

        catch (error) {

            console.log(error);

            alert("Failed to Add Expense");

        }

    };

    return (

        <>

            <Navbar />

            <div className="form-container">

                <div className="form-card">

                    <h1>Add New Expense</h1>

                    <form onSubmit={handleSubmit}>

                        <div className="form-group">

                            <label>Expense Title</label>

                            <input

                                type="text"

                                name="title"

                                placeholder="Enter Expense Title"

                                value={expense.title}

                                onChange={handleChange}

                                required

                            />

                        </div>

                        <div className="form-group">

                            <label>Amount</label>

                            <input

                                type="number"

                                name="amount"

                                placeholder="Enter Amount"

                                value={expense.amount}

                                onChange={handleChange}

                                required

                            />

                        </div>

                        <div className="form-group">

                            <label>Category</label>

                            <select

                                name="category"

                                value={expense.category}

                                onChange={handleChange}

                                required

                            >

                                <option value="">Select Category</option>

                                <option value="Food">🍔 Food</option>

                                <option value="Travel">✈️ Travel</option>

                                <option value="Shopping">🛍 Shopping</option>

                                <option value="Bills">💡 Bills</option>

                                <option value="Health">🏥 Health</option>

                                <option value="Education">📚 Education</option>

                                <option value="Entertainment">🎬 Entertainment</option>

                                <option value="Other">📦 Other</option>

                            </select>

                        </div>

                        <div className="form-group">

                            <label>Expense Date</label>

                            <input

                                type="date"

                                name="expense_date"

                                value={expense.expense_date}

                                onChange={handleChange}

                                required

                            />

                        </div>

                        <div className="form-group">

                            <label>Description</label>

                            <textarea

                                rows="5"

                                name="description"

                                placeholder="Enter Description"

                                value={expense.description}

                                onChange={handleChange}

                            ></textarea>

                        </div>

                        <button

                            type="submit"

                            className="submit-btn"

                        >

                            Add Expense

                        </button>

                    </form>

                    {

                        successMessage &&

                        <div className="success-message">

                            {successMessage}

                        </div>

                    }

                </div>

            </div>

        </>

    );

};

export default AddExpense;