/*
To do Item, Due Date, Priority Level, Starred, Creation date,
Finished date
*/

import React, { useEffect } from "react";
import "./Home.css";
import { Button } from "@mui/material";
import Box from "../../components/box/Box";
import SingleTodo from "../../components/singleTodo/SingleTodo";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { TodoActions } from "../../Store/reducers/todo-reducer.js";
const token = localStorage.getItem("token");

const Home = () => {
  const totalTodo = useSelector((state) => state.todo.totalTodo);
  const fetchTodo = useSelector((state) => state.todo.fetchTodo);
  const initialTodo = useSelector((state) => state.todo.initialTodo);
  const dispatch = useDispatch();

  useEffect(() => {
    (async function getTodo() {
      const response = await axios.get(
        "http://localhost:3000/todo/getalltodos",
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(response.data.todos);
      dispatch(TodoActions.addTodos([...response.data.todos]));
      dispatch(TodoActions.addInitial([...response.data.todos]));
    })();
  }, [fetchTodo]);

  const filterStarredHandler = () => {
    const filteredTodo = totalTodo.filter((item) => item.starred == true);
    dispatch(TodoActions.addTodos([...filteredTodo]));
  };

  const filterDoneHandler = () => {
    const filteredTodo = totalTodo.filter((item) => item.finisheddate);
    dispatch(TodoActions.addTodos([...filteredTodo]));
  };

  const filterCrossedHandler = () => {
    const filteredTodo = totalTodo.filter(
      (item) => new Date(item.duedate).getTime() < new Date().getTime()
    );
    dispatch(TodoActions.addTodos([...filteredTodo]));
  };

  const resetFilterhandler = () => {
    dispatch(TodoActions.addTodos([...initialTodo]));
  };

  return (
    <div className="homepage-component-outer">
      <Box className="welcomebox">
        <h2> Welcome to Rapid Todo. Maintain your deadlines with ease! </h2>
      </Box>

      <Box className="alltodocontainerinhome">
        <div>
          <Button
            onClick={filterStarredHandler}
            sx={{
              backgroundColor: "rgb(253, 218, 13)",
              color: "white",
              margin: "5px 10px",
              height: "30px",
              width: "150px",
            }}
          >
            Starred
          </Button>
          <Button
            onClick={filterDoneHandler}
            sx={{
              backgroundColor: "green",
              color: "white",
              margin: "5px 10px",
              height: "30px",
              width: "150px",
            }}
          >
            Done
          </Button>
          <Button
            onClick={filterCrossedHandler}
            sx={{
              backgroundColor: "red",
              color: "white",
              margin: "5px 10px",
              height: "30px",
              width: "150px",
            }}
          >
            Crossed
          </Button>

          <Button
            onClick={resetFilterhandler}
            sx={{
              backgroundColor: "red",
              color: "white",
              margin: "5px 10px",
              height: "30px",
              width: "100px",
            }}
          >
            Reset
          </Button>
        </div>
        <div>
          <Box className="todo-heading-container">
            <div className="all-heading-container">
              <Box className="cls-todo-text1">Todo</Box>
              <Box className="cls-todo-priority">Priority</Box>
              <Box className="cls-todo-date brdr-rad">Due</Box>
              <Box className="cls-todo-date brdr-rad">Created</Box>
              <Box className="cls-todo-date finish brdr-rad">Finished</Box>
            </div>
            <div className="blank-balance"></div>
          </Box>
          {totalTodo.map((item) => {
            return <SingleTodo item={item} />;
          })}
        </div>
      </Box>
    </div>
  );
};

export default Home;
