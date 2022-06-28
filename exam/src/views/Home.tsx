import React, { useContext } from "react";
import { Routes, Route } from "react-router";
import { Link } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import IdentityService from "../services/IdentityService";
import { AppContext } from "../state/AppContext";

const Home = () => {
    const appState = useContext(AppContext);
    
    const handleLogout = () => {
        IdentityService.logout();
        appState.setloggedIn(false);
    }

    const NavButtons = () => {
        if (IdentityService.loggedIn()) {
            if (IdentityService.isAdmin()) {
                return(
                    <>
                        <button type="button" className="btn btn-primary btn-lg px-4 gap-3"
                        onClick={handleLogout}>
                            Logout
                            </button>
                        <Link to="/dashboard">
                            <button type="button" className="btn btn-warning btn-lg px-4 gap-3">To Admin Dashboard</button>
                        </Link>
                        <Link to="/dashboard/user">
                            <button type="button" className="btn btn-primary btn-lg px-4 gap-3">To Dashboard</button>
                        </Link>
                    </>
                )

            }
            return (
                <>
                <button type="button" className="btn btn-primary btn-lg px-4 gap-3"
                onClick={handleLogout}>
                    Logout
                    </button>
                <Link to="/dashboard/user">
                    <button type="button" className="btn btn-primary btn-lg px-4 gap-3">To Dashboard</button>
                </Link>
                </>
            )
        }
        
        return (
            <>
            <Link to="/login">
            <button type="button" className="btn btn-primary btn-lg px-4 gap-3">Login</button>
            </Link>
            <Link to="/register">
                <button type="button" className="btn btn-primary btn-lg px-4 gap-3">Register</button>
            </Link>
            </>
        )
    }

    return(
        <>
        <div className="container">
            <div className="px-4 py-5 my-5 text-center">
                <h1 className="display-5 fw-bold">Hotel!</h1>
                <div className="col-lg-6 mx-auto">
                    <p className="lead mb-4">Hotel management landing page</p>
                    <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                        {NavButtons()}
                    </div>
                </div>
            </div>
            <Routes>
                <Route path="login" element={ <LoginForm /> } />
                <Route path="register" element={ <RegisterForm />} />
            </Routes>
        </div>
        </>
    )
}

export default Home;