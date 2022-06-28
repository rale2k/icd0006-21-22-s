import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import IdentityService from "../services/IdentityService";
import { AppContext } from "../state/AppContext";

const LoginForm = () => {
    const appState = useContext(AppContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await IdentityService.login(email, password)
            .then((res) => {
                if (!res.success) {
                    console.log(res)
                    return;
                }
                appState.setloggedIn(true);
                navigate("/");
            }
            ).catch((res) => {
                console.log(res);
            }
        );
    }

    return(
        <>
        <div className="form-identity form-signin">
            <h1 className="h3 mb-3 fw-normal">Sign in</h1>
            <form onSubmit={handleLogin}>
                <div className="form-floating">
                    <input className="form-control form-control-top" id="floatingEmail" type="email" placeholder="name@example.com"
                    onChange={(e) => {setEmail(e.target.value)}}/>
                    <label>Email</label>
                </div>
                <div className="form-floating">
                    <input v-model="password" className="form-control form-control-bottom" id="floatingPass" type="password" placeholder="Password"
                    onChange={(e) => {setPassword(e.target.value)}}/>
                    <label>Password</label>
                </div>
                <button type="submit" className="w-100 btn btn-lg btn-primary">Sign in</button>
            </form>
        </div>
        </>
    )
}

export default LoginForm;
