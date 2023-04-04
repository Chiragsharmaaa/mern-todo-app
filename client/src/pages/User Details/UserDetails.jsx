import React, { useRef } from "react";
import "./UserDetails.css";
import axios from "axios";
const token = localStorage.getItem("token");

const UserDetails = () => {
  const userNameRef = useRef();
  const userOldEmailRef = useRef();
  const userNewEmailRef = useRef();
  const userPswrdRef = useRef();

  const formSubmitHandler = async (e) => {
    e.preventDefault();

    const userObj = {
      name: userNameRef.current.value,
      oldemail: userOldEmailRef.current.value,
      newemail: userNewEmailRef.current.value,
      password: userPswrdRef.current.value,
    };
    const response = await axios.post(
      "http://localhost:3000/user/updateuserdetails",
      userObj,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    userNameRef.current.value = "";
    userOldEmailRef.current.value = "";
    userNewEmailRef.current.value = "";
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
          />
        </div>
        <div className="form-group">
          <input
            className="form-control"
            type="text"
            placeholder="Old Email"
            ref={userOldEmailRef}
          />
        </div>
        <div className="form-group">
          <input
            className="form-control"
            type="text"
            placeholder="New Email"
            ref={userNewEmailRef}
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
          Register
        </button>
      </form>
    </div>
  );
};

export default UserDetails;
