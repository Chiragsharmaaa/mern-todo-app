import React, { useRef } from "react";
import "./Signup.css";
import axios from "axios";

const Signup = () => {
  const userNameRef = useRef();
  const userEmailRef = useRef();
  const userPswrdRef = useRef();

  const formSubmitHandler = async (e) => {
    e.preventDefault();

    const userObj = {
      name: userNameRef.current.value,
      email: userEmailRef.current.value,
      password: userPswrdRef.current.value,
    };

    console.table(userObj);

    const response = await axios.post(
      "http://localhost:3000/user/signup",
      userObj
    );
    console.log(response);

    userNameRef.current.value = "";
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
            placeholder="Username"
            ref={userNameRef}
            required
          />
        </div>
        <div className="form-group">
          <input
            className="form-control"
            type="email"
            placeholder="Email"
            ref={userEmailRef}
            required
          />
        </div>
        <div className="form-group">
          <input
            className="form-control"
            type="password"
            placeholder="Password"
            ref={userPswrdRef}
            required
          />
        </div>
        <button className="btn btn-primary" type="submit">
          Register
        </button>
      </form>
    </div>
  );
};

export default Signup;
