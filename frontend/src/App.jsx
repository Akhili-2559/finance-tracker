import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddExpense from "./pages/AddExpense";
import EditExpense from "./pages/EditExpense";
import Reports from "./pages/Reports";
import Summary from "./pages/Summary";
import Recommendations from "./pages/Recommendations";


import ProtectedRoute from "./components/ProtectedRoute";

function App() {

    return (

        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/add-expense"
                    element={
                        <ProtectedRoute>
                            <AddExpense />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/edit-expense/:id"
                    element={
                        <ProtectedRoute>
                            <EditExpense />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/reports"
                    element={
                        <ProtectedRoute>
                            <Reports />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/summary"
                    element={
                        <ProtectedRoute>
                            <Summary />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/recommendations"
                    element={
                        <ProtectedRoute>
                            <Recommendations />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="*"
                    element={<Navigate to="/" />}
                />

            </Routes>

        </BrowserRouter>

    );

}

export default App;