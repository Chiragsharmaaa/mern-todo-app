import React, { useState } from "react";
import Login from "../Login/Login";
import Signup from "../Signup/Signup";
import { Button } from "@mui/material";

const Auth = () => {
  const [showLogin, setShowLogin] = useState(false);

  const switchFormHandler = () => {
    setShowLogin((p) => !p);
  };

  return (
    <div>
      {showLogin ? <Login /> : <Signup />}
      <Button onClick={switchFormHandler}>
        {showLogin ? "Register" : "Login"}
      </Button>
    </div>
  );
};

export default Auth;
