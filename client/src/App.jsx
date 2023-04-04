import { Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense, useEffect, useState } from "react";
import "./App.css";
const CreateTodo = lazy(() => import("./pages/Create Todo/CreateTodo"));
const Home = lazy(() => import("./pages/Home/Home"));
const UserDetails = lazy(() => import("./pages/User Details/UserDetails"));
import Header from "./components/header/Header";
import Auth from "./pages/auth/Auth";
import { useDispatch, useSelector } from "react-redux";
import { TodoActions } from "./Store/reducers/todo-reducer";

function App() {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const userLoggedIn = useSelector((state) => state.todo.userLoggedIn);

  useEffect(() => {
    if (!!token) {
      dispatch(TodoActions.login());
    } else {
      dispatch(TodoActions.logout());
    }
  }, [token]);
  return (
    <div className="App">
      <Header />
      <Suspense fallback={<p>Loading...</p>}>
        <Routes>
          <Route
            path="/"
            element={userLoggedIn ? <Home /> : <Navigate to="/auth" />}
          />
          <Route
            path="/createtodo"
            element={userLoggedIn ? <CreateTodo /> : <Navigate to="/auth" />}
          />
          <Route
            path="/createtodo/:id"
            element={userLoggedIn ? <CreateTodo /> : <Navigate to="/auth" />}
          />
          <Route
            path="/userdetails"
            element={userLoggedIn ? <UserDetails /> : <Navigate to="/auth" />}
          />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
