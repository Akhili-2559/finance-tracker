import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {

    const { user, logout } = useAuth();

    return (

        <header className="nav">

            <div className="nav-left">

                <h1>💸 FinanceTracker</h1>

            </div>

            <nav className="nav-right">

                {

                    user ?

                    <>

                        <Link to="/dashboard">Dashboard</Link>

                        <Link to="/add-expense">Add Expense</Link>

                        <Link to="/reports">All Expenses</Link>

                        <Link to="/summary">Summary</Link>

                        <Link to="/recommendations">Recommendations</Link>

                        <Link
                            to="/login"
                            className="logout"
                            onClick={logout}
                        >
                            Logout
                        </Link>

                    </>

                    :

                    <>

                        <Link to="/login">Login</Link>

                        <Link to="/register">Register</Link>

                    </>

                }

            </nav>

        </header>

    );

};

export default Navbar;