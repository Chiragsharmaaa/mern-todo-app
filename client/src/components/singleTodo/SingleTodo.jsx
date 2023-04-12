import React, { useState } from "react";
import Box from "../box/Box";
import "./SingleTodo.css";
import ReactStars from "react-stars";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
const token = localStorage.getItem("token");
import { TodoActions } from "../../Store/reducers/todo-reducer.js";
import editIcon from "./edit.png";
import { useNavigate, useLocation } from "react-router-dom";

const SingleTodo = (props) => {
  const [isStarred, setIsStarred] = useState(props.item.starred);
  const [isChecked, setIsChecked] = useState(props.item.finisheddate);
  const dispatch = useDispatch();
  const history = useNavigate();
  const location = useLocation();
  console.log(location);

  const doneChangeHandler = async (event) => {
    if (props.item.finisheddate) {
      setIsChecked(true);
    } else {
      setIsChecked(event.target.checked);
    }

    const newValue = event.target.checked;
    const todoId = props.item.id;
    await axios.post(
      `http://localhost:3000/todo/updatedone/${todoId}`,
      {
        completed: newValue,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );

    dispatch(TodoActions.fetchTodos());
  };

  const starChangeHandler = async () => {
    setIsStarred((p) => !p);
    const todoId = props.item.id;

    await axios.post(
      `http://localhost:3000/todo/updatestar/${todoId}`,
      { value: !isStarred },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    dispatch(TodoActions.fetchTodos());
  };

  const editTodoHandler = async () => {
    const id = props.item.id;
    console.log(id);
    await axios.delete(`http://localhost:3000/todo/deletetodo/${id}`, {
      headers: {
        Authorization: token,
      },
    });
    history(`/createtodo/${props.item.id}`, { state: { item: props.item } });
  };

  return (
    <Box className="single-todo-outerbox">
      <div className="todo-prio-dates-container">
        {" "}
        <Box className="cls-todo-text">
          <h2>{props.item.text}</h2>
        </Box>
        <Box className="cls-todo-priority">
          <h3>{props.item.priority}</h3>
        </Box>
        <Box className="cls-todo-date remove-bg">
          <h3>
            {new Date(props.item.duedate).toLocaleDateString("en-us", {
              weekday: "long",
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </h3>
        </Box>
        <Box className="cls-todo-date remove-bg">
          <h3>
            {" "}
            {new Date(props.item.createdAt).toLocaleDateString("en-us", {
              weekday: "long",
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </h3>
        </Box>
        {props.item.finisheddate ? (
          <Box className="cls-todo-date remove-bg">
            <h3>
              {" "}
              {new Date(props.item.finisheddate).toLocaleDateString("en-us", {
                weekday: "long",
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </h3>
          </Box>
        ) : (
          <Box className="cls-todo-date remove-bg">
            <h3>Pending!</h3>
          </Box>
        )}
      </div>
      <div className="check-and-star">
        {" "}
        <Box className="cls-todo-done">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={doneChangeHandler}
          />
        </Box>
        <Box className="cls-todo-starred">
          <ReactStars
            onChange={starChangeHandler}
            count={1}
            value={+isStarred}
            half={false}
            size={24}
            color2={"#ffd700"}
          />
        </Box>
      </div>
      <div className="edittodo">
        <Box className="cls-todo-edit">
          <button onClick={editTodoHandler}>
            <img src={editIcon}></img>
          </button>
        </Box>
      </div>
    </Box>
  );
};

export default SingleTodo;
