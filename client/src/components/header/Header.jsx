import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Header.css";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import BurgerIcon from "./images/burger.png";
import TodoLogo from "./images/todologo.png";
import LogoutLogo from "./images/logout.png";
import { useDispatch } from "react-redux";
import { TodoActions } from "../../Store/reducers/todo-reducer";

const drawerWidth = 240;

const Header = (props) => {
  const token = localStorage.getItem("token");
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const dispatch = useDispatch();
  const [login, setLogin] = useState(false);
  const history = useNavigate();

  useEffect(() => {
    setLogin(!!token);
  }, [token]);

  const logoutHandler = () => {
    console.log("called");
    dispatch(TodoActions.logout());
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("token");
    history("/auth");
  };

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography
        variant="h6"
        sx={{
          my: 2,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src={TodoLogo}
          alt="logo"
          className="logo-header-ballIcon-img flext-icon-phone-size"
        />
        <div className="logo-text-hdr-cntnr flex-text-hdr-phone-small-dev">
          RAPID TODO
        </div>
      </Typography>
      <Divider />
      <List sx={{ display: "flex", flexDirection: "column" }}>
        {login ? (
          <>
            <NavLink
              className={(status) => (status.isActive ? "active" : "inActive")}
              to="/"
            >
              Home
            </NavLink>

            <NavLink
              className={(status) => (status.isActive ? "active" : "inActive")}
              to="/createtodo"
            >
              + Todo
            </NavLink>

            <NavLink
              className={(status) => (status.isActive ? "active" : "inActive")}
              to="/userdetails"
            >
              Profile
            </NavLink>
            <Button onClick={logoutHandler}>
              <img src={LogoutLogo} />
            </Button>
          </>
        ) : (
          <NavLink
            className={(status) => (status.isActive ? "active" : "inActive")}
            to="/auth"
          >
            Login/Signup
          </NavLink>
        )}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav" sx={{ backgroundColor: "white", padding: "5px" }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{
              mr: 1,
              height: "40px",
              width: "40px",
              borderRadius: "10px",
              display: { sm: "none" },
              backgroundColor: "rgba(142, 38, 38, 0)",
            }}
          >
            <img
              className="left-mobile-menu-drager-btn"
              src={BurgerIcon}
              alt="Burgericon"
            />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              color: "black",
              textAlign: "left",
              fontSize: "30px",
              fontWeight: "600",
              display: { xs: "none", sm: "flex" },
              justifyContent: "left",
              alignItems: "center",
            }}
          >
            <img
              src={TodoLogo}
              alt="logo"
              className="logo-header-ballIcon-img"
            />{" "}
            <div className="logo-text-hdr-cntnr">RAPID TODO</div>
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {login ? (
              <>
                <NavLink
                  className={(status) =>
                    status.isActive ? "active" : "inActive"
                  }
                  to="/"
                >
                  Home
                </NavLink>

                <NavLink
                  className={(status) =>
                    status.isActive ? "active" : "inActive"
                  }
                  to="/createtodo"
                >
                  + Todo
                </NavLink>

                <NavLink
                  className={(status) =>
                    status.isActive ? "active" : "inActive"
                  }
                  to="/userdetails"
                >
                  Profile
                </NavLink>
                <Button onClick={logoutHandler}>
                  <img src={LogoutLogo} />
                </Button>
              </>
            ) : (
              <NavLink
                className={(status) =>
                  status.isActive ? "active" : "inActive"
                }
                to="/auth"
              >
                Login/Signup
              </NavLink>
            )}
          </Box>
        </Toolbar>
        <Box component="nav">
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
        </Box>
      </AppBar>
    </Box>
  );
};

export default Header;
