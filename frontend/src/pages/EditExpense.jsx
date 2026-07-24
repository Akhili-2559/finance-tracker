import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../services/api";

const EditExpense = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [expense, setExpense] = useState({

        title: "",

        amount: "",

        category: "",

        expense_date: "",

        description: ""

    });

    useEffect(() => {

        loadExpense();

    }, []);

    const loadExpense = async () => {

        try {

            const res = await api.get(`/expenses/${id}`);

            setExpense(res.data);

        }

        catch (error) {

            console.log(error);

            alert("Failed to Load Expense");

        }

    };

    const handleChange = (e) => {

        setExpense({

            ...expense,

            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await api.put(`/expenses/${id}`, expense);

            alert("Expense Updated Successfully");

            navigate("/reports");

        }

        catch (error) {

            console.log(error);

            alert("Failed to Update Expense");

        }

    };

    return (

        <>

            <Navbar />

            <div className="form-container">

                <div className="form-card">

                    <h1>Edit Expense</h1>

                    <form onSubmit={handleSubmit}>

                        <div className="form-group">

                            <label>Expense Title</label>

                            <input
                                type="text"
                                name="title"
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
                                value={expense.description}
                                onChange={handleChange}
                            ></textarea>

                        </div>

                        <button
                            type="submit"
                            className="submit-btn"
                        >

                            Update Expense

                        </button>

                    </form>

                </div>

            </div>

        </>

    );

};

export default EditExpense;