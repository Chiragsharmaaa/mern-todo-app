/*
To do Item, Due Date, Priority Level, Starred, Creation date,
Finished date
*/
import React, { useEffect, useRef, useState } from "react";
import "./CreateTodo.css";
import ReactStars from "react-stars";
import Box from "../../components/box/Box";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { TodoActions } from "../../Store/reducers/todo-reducer";
import { useLocation } from "react-router-dom";
let token = localStorage.getItem("token");

const CreateTodo = () => {
  const dispatch = useDispatch();
  const todoInputRef = useRef();
  const priorityInputRef = useRef();
  const dueDateInputRef = useRef();
  const [isStarred, setIsStarred] = useState(0);
  const location = useLocation();
  console.log(location);

  useEffect(() => {
    if (location.state) {
      const variable = location.state.item;
      todoInputRef.current.value = variable.text;
      priorityInputRef.current.value = variable.priority;
      dueDateInputRef.current.value = new Date(variable.duedate);
      setIsStarred(variable.starred);
    }
  }, []);

  const starChangeHandler = () => {
    if (isStarred === 0) {
      setIsStarred(1);
    } else {
      setIsStarred(0);
    }
  };

  const formSubmitHandler = async (e) => {
    e.preventDefault();

    const todoInputObj = {
      text: todoInputRef.current.value,
      priority: priorityInputRef.current.value,
      duedate: dueDateInputRef.current.value.toString(),
      // finisheddate: "",
      starred: isStarred,
      done: 0,
    };

    const response = await axios.post(
      "http://localhost:3000/todo/createtodo",
      todoInputObj,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    if (response.status == 201) {
      dispatch(TodoActions.fetchTodos());
    }
    todoInputRef.current.value = "";
    priorityInputRef.current.value = "";
    dueDateInputRef.current.value = "";
  };

  return (
    <div className="CreateTodo-component-outer">
      <Box>
        <form onSubmit={formSubmitHandler}>
          <input placeholder="Todo" type="text" ref={todoInputRef} />
          <div>
            <select required ref={priorityInputRef}>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </div>
          <div>
            <label htmlFor="duedate">Due Date</label>
            <input
              id="duedate"
              placeholder="Due Date"
              type="date"
              ref={dueDateInputRef}
            />
          </div>
          <ReactStars
            onChange={starChangeHandler}
            count={1}
            value={isStarred}
            half={false}
            size={24}
            color2={"#ffd700"}
          />
          <button type="submit">+ Add</button>
        </form>
      </Box>
    </div>
  );
};

export default CreateTodo;
