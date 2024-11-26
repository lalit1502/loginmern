import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    navigate("/login"); // Redirect if not logged in
                }
                const response = await axios.get("http://localhost:5000/dashboard", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setMessage(response.data.message);
            } catch (error) {
                setMessage("Error loading dashboard. Please log in again.");
                localStorage.removeItem("token");
                navigate("/login");
            }
        };

        fetchDashboard();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("token"); // Clear the token
        navigate("/login"); // Redirect to login page
    };

    return (
        <div>
            <h2>Dashboard</h2>
            <p>{message}</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Dashboard;
