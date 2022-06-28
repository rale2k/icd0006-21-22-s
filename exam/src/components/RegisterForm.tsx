import React, { useState } from "react";
import { useNavigate } from "react-router";
import IdentityService from "../services/IdentityService";

const RegisterForm = () => {
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await IdentityService.register(email, password, firstName, lastName)
            .then((res) => {
                if (!res.success) {
                    console.log(res)
                    return;
                }
                navigate("/");
            }
            ).catch((res) => {
                console.log(res);
            }
        );
    }

    return(
        <>
            <div className="form-identity form-register">
                <h1 className="h3 mb-3 fw-normal">Register</h1>
                <form onSubmit={handleRegister}>
                    <div className="form-floating">
                        <input type="email" className="form-control form-control-top" placeholder="name@example.com"
                        onChange={(e) => {setEmail(e.target.value)}}/>
                        <label>Email</label>
                    </div>
                    <div className="form-floating">
                        <input type="text" className="form-control form-control-middle" placeholder="John"
                        onChange={(e) => {setFirstName(e.target.value)}}/>
                        <label>First name</label>
                    </div>
                    <div className="form-floating">
                        <input type="text" className="form-control form-control-middle" placeholder="John"
                        onChange={(e) => {setLastName(e.target.value)}}/>
                        <label>Last name</label>
                    </div>

                    <div className="form-floating">
                        <input type="password" className="form-control form-control-bottom" id="floatingPassword" placeholder="Password"
                        onChange={(e) => {setPassword(e.target.value)}}/>
                        <label>Password</label>
                    </div>
                    <button type="submit" className="w-100 btn btn-lg btn-primary" >Register</button>
                </form>
            </div>
        </>
    )
}

export default RegisterForm;