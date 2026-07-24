import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";

const Recommendations = () => {

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

    let totalSpent = 0;

    const categoryTotals = {};

    expenses.forEach((expense) => {

        totalSpent += Number(expense.amount);

        categoryTotals[expense.category] =

            (categoryTotals[expense.category] || 0)

            +

            Number(expense.amount);

    });

    let highestCategory = "";

    let highestAmount = 0;

    Object.entries(categoryTotals).forEach(([category, amount]) => {

        if (amount > highestAmount) {

            highestAmount = amount;

            highestCategory = category;

        }

    });

    const highestPercentage =

        totalSpent === 0

            ? 0

            : ((highestAmount / totalSpent) * 100).toFixed(1);

    let recommendation = {

        icon: "🎉",

        title: "Excellent Budget Management",

        message: "Your spending is balanced across all categories. Keep tracking your expenses regularly."

    };

    if (highestPercentage >= 40) {

        switch (highestCategory) {

            case "Food":

                recommendation = {

                    icon: "🍔",

                    title: "Food Spending is High",

                    message: `Food accounts for ${highestPercentage}% of your expenses. Consider cooking at home more often.`

                };

                break;

            case "Shopping":

                recommendation = {

                    icon: "🛍️",

                    title: "Shopping Expenses are High",

                    message: `Shopping accounts for ${highestPercentage}% of your expenses. Avoid unnecessary purchases and plan your shopping.`

                };

                break;

            case "Travel":

                recommendation = {

                    icon: "✈️",

                    title: "Travel Expenses are High",

                    message: `Travel accounts for ${highestPercentage}% of your expenses. Try public transport or better trip planning.`

                };

                break;

            case "Bills":

                recommendation = {

                    icon: "💡",

                    title: "Utility Bills are High",

                    message: `Bills account for ${highestPercentage}% of your expenses. Reduce electricity and internet usage where possible.`

                };

                break;

            case "Entertainment":

                recommendation = {

                    icon: "🎬",

                    title: "Entertainment Spending is High",

                    message: `Entertainment accounts for ${highestPercentage}% of your expenses. Set a monthly entertainment budget.`

                };

                break;

            case "Education":

                recommendation = {

                    icon: "📚",

                    title: "Education is Your Highest Expense",

                    message: `Education accounts for ${highestPercentage}% of your expenses. If these are tuition fees or certifications, it's a valuable investment. Otherwise, review unnecessary educational purchases.`

                };

                break;

            case "Health":

                recommendation = {

                    icon: "🏥",

                    title: "Health Expenses are High",

                    message: `Health accounts for ${highestPercentage}% of your expenses. Maintain an emergency fund for future medical needs.`

                };

                break;

            default:

                recommendation = {

                    icon: "📦",

                    title: "Other Expenses are High",

                    message: `Other expenses account for ${highestPercentage}% of your spending. Review these expenses carefully.`

                };

        }

    }

    let budgetScore = 95;

    if (highestPercentage > 70)

        budgetScore = 50;

    else if (highestPercentage > 60)

        budgetScore = 60;

    else if (highestPercentage > 50)

        budgetScore = 75;

    else if (highestPercentage > 40)

        budgetScore = 85;

    return (

        <>

            <Navbar />

            <div className="recommendation-page">

                <h1>

                    Smart Recommendations

                </h1>

                <div className="recommendation-summary">

                    <div className="summary-box">

                        <h3>Total Expenses</h3>

                        <h2>{expenses.length}</h2>

                    </div>

                    <div className="summary-box">

                        <h3>Total Spent</h3>

                        <h2>₹ {totalSpent}</h2>

                    </div>

                    <div className="summary-box">

                        <h3>Highest Category</h3>

                        <h2>{highestCategory || "-"}</h2>

                    </div>

                    <div className="summary-box">

                        <h3>Budget Score</h3>

                        <h2>{budgetScore}/100</h2>

                    </div>

                </div>

                {

                    expenses.length === 0 ?

                    (

                        <div className="empty-box">

                            <h2>No Expenses Found</h2>

                            <p>Add some expenses to receive smart recommendations.</p>

                        </div>

                    )

                    :

                    (

                        <>

                            <div className="recommendation-card">

                                <div className="recommendation-icon">

                                    {recommendation.icon}

                                </div>

                                <div>

                                    <h2>{recommendation.title}</h2>

                                    <p>{recommendation.message}</p>

                                </div>

                            </div>

                            <div className="recommendation-card">

                                <div className="recommendation-icon">

                                    📊

                                </div>

                                <div>

                                    <h2>Expense Analysis</h2>

                                    <p>

                                        Your highest spending category is <strong>{highestCategory}</strong>.

                                        It contributes <strong>{highestPercentage}%</strong> of your total expenses.

                                    </p>

                                </div>

                            </div>

                            <div className="recommendation-card">

                                <div className="recommendation-icon">

                                    💰

                                </div>

                                <div>

                                    <h2>Money Saving Tip</h2>

                                    <p>

                                        Track your expenses weekly, avoid impulse purchases, and try saving at least 20% of your monthly income for future goals.

                                    </p>

                                </div>

                            </div>

                        </>

                    )

                }

            </div>

        </>

    );

};

export default Recommendations;