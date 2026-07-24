import { useNavigate } from "react-router-dom";
import api from "../services/api";

const ExpenseCard = ({ expense }) => {

    const navigate = useNavigate();

    const deleteExpense = async () => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this expense?"
        );

        if (!confirmDelete) return;

        try {

            await api.delete(`/expenses/${expense.id}`);

            alert("Expense Deleted Successfully");

            window.location.reload();

        } catch (error) {

            console.log(error);

            alert("Failed to delete expense");

        }

    };

    return (

        <div className="expense-card">

            <div className="expense-top">

                <div>

                    <h3>{expense.title}</h3>

                    <span className="expense-category">

                        {expense.category}

                    </span>

                </div>

                <h2 className="expense-amount">

                    ₹ {expense.amount}

                </h2>

            </div>

            <div className="expense-bottom">

                <p>

                    📅 {expense.expense_date}

                </p>

                <p>

                    📝 {expense.description || "No Description"}

                </p>

            </div>

            <div className="expense-actions">

                <button
                    className="edit-btn"
                    onClick={() =>
                        navigate(`/edit-expense/${expense.id}`)
                    }
                >
                    ✏️ Edit
                </button>

                <button
                    className="delete-btn"
                    onClick={deleteExpense}
                >
                    🗑 Delete
                </button>

            </div>

        </div>

    );

};

export default ExpenseCard;