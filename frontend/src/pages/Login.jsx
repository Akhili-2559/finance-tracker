import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

const Login = () => {

    const navigate = useNavigate();

    const { login } = useAuth();

    const [formData, setFormData] = useState({

        username: "",

        password: ""

    });

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const res = await api.post("/auth/login", formData);

            login(

                res.data.user,

                res.data.token

            );

            navigate("/dashboard");

        }

        catch (err) {

            alert(

                err.response?.data?.message ||

                "Login Failed"

            );

        }

    };

    return (

        <>

            <Navbar />

            <div className="login-page">

                <div className="login-card">

                    <h1>Login</h1>

                    <form onSubmit={handleSubmit}>

                        <input

                            type="text"

                            name="username"

                            placeholder="Username"

                            value={formData.username}

                            onChange={handleChange}

                            required

                        />

                        <input

                            type="password"

                            name="password"

                            placeholder="Password"

                            value={formData.password}

                            onChange={handleChange}

                            required

                        />

                        <button type="submit">

                            Login

                        </button>

                    </form>

                    <p>

                        Don't have an account?{" "}

                        <Link to="/register">

                            Register

                        </Link>

                    </p>

                </div>

            </div>

        </>

    );

};

export default Login;