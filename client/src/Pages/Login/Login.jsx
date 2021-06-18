import React, { useContext, useRef } from "react";
import { NavLink } from "react-router-dom";
import { Context } from "../../contexts/Context";
import axios from "axios";
import "./Login.css";

function Login() {
  const emailRef = useRef();
  const passRef = useRef();
  const { user , dispatch, isFetching } = useContext(Context);

  const Submit =async (e) => {
    e.preventDefault();
    dispatch({ type: "Login_Start" });
    try {
      const res = await axios.post("/auth/login" , {
        email:emailRef.current.value,
        pass:passRef.current.value,
      })
      dispatch({type:"Login_Success" , payload:res.data})
    } catch (error) {
      dispatch({type:"Login_Failure"})
    }
    console.log(isFetching);
  };
  return (
    <>
      <div className="Login">
        <span className="LoginTitle">Login</span>
        <form className="LoginForm" onSubmit={Submit}>
          <label>Email</label>
          <input
            className="LoginInputs"
            type="email"
            placeholder="Enter Email....."
            ref={emailRef}
          />
          <label> Password</label>
          <input className="LoginInputs" type="password" ref={passRef} />
          <button className="LoginBtn" disabled={isFetching}>Login</button>
        </form>
        <button className="register">
          <NavLink to="/register" className="linkk">
            REGISTER
          </NavLink>
        </button>
      </div>
    </>
  );
}

export default Login;
