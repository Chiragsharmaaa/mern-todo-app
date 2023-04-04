import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { TodoActions } from "../../Store/reducers/todo-reducer";

const Login = () => {
  const userEmailRef = useRef();
  const userPswrdRef = useRef();
  const history = useNavigate();
  const dispatch = useDispatch();
  const formSubmitHandler = async (e) => {
    e.preventDefault();

    const userObj = {
      email: userEmailRef.current.value,
      password: userPswrdRef.current.value,
    };

    console.table(userObj);
    const response = await axios.post(
      "http://localhost:3000/user/login",
      userObj
    );
    if (response.status == 200) {
      dispatch(TodoActions.login());
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("isLoggedIn", true);

      history("/");
    }
    userEmailRef.current.value = "";
    userPswrdRef.current.value = "";
  };

  return (
    <div className="UserDetails-outer-component">
      <form onSubmit={formSubmitHandler}>
        <div className="form-group">
          <input
            className="form-control"
            type="text"
            placeholder="Email"
            ref={userEmailRef}
          />
        </div>
        <div className="form-group">
          <input
            className="form-control"
            type="password"
            placeholder="Password"
            ref={userPswrdRef}
          />
        </div>
        <button className="btn btn-primary" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
