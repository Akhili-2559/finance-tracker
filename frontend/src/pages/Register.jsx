import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../services/api";

const Register = () => {

    const navigate = useNavigate();

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

            const res = await api.post("/auth/register", formData);

            alert(res.data.message);

            navigate("/login");

        }

        catch (err) {

            alert(

                err.response?.data?.message ||

                "Registration Failed"

            );

        }

    };

    return (

        <>

            <Navbar />

            <div className="login-page">

                <div className="login-card">

                    <h1>Register</h1>

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

                            Register

                        </button>

                    </form>

                    <p>

                        Already have an account?{" "}

                        <Link to="/login">

                            Login

                        </Link>

                    </p>

                </div>

            </div>

        </>

    );

};

export default Register;