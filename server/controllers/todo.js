const Todo = require("../models/todo");

exports.postAddTodo = async (req, res, next) => {

  const { text, priority, duedate, starred, done } = req.body;
  try {
    const data = await req.user.createTodo({
      text,
      priority,
      duedate,
      finisheddate: null,
      done,
      starred
    });
    res.status(201).json({ data, message: "todo added!" });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Cannot add Todo!" });
  }
};

exports.getAllTodos = async (req, res, next) => {
  try {
    const todos = await Todo.findAll();
    res.status(200).json({ todos });
  } catch (error) {
    res.send(500).json({ message: "Unable to retrieve todos!" });
  }
};

exports.postAddStar = async (req, res, next) => {
  try {
    const { value } = req.body;
    const todoId = req.params.id;
    const todo = await Todo.findOne({ where: { id: todoId } });
    console.log(todo)
    await todo.update({ starred: value });
    res.status(201).json({ message: "Successfuly updated star status" });
  } catch (error) {
    return res.status(500).json({ message: err });
  }
};

exports.postAddDone = async (req, res, next) => {
  try {
    const { completed } = req.body;
    const todoId = req.params.id;
    const todo = await Todo.findOne({ where: { id: todoId } });
    await todo.update({ done: completed, finisheddate: new Date().getTime() });
    res.status(201).json({ message: "Successfuly updated done status" });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: err });
  }
};

exports.deleteTodo = async (req, res, next) => {
  try {
    const todoId = req.params.id;
    console.log('todoId', todoId)
    await req.user.getTodos({ where: { id: todoId } }).then((todo) => {
      let foundTodo = todo[0];
      console.log('sds', foundTodo)
      foundTodo.destroy();
      res.status(200).json({ message: "Successfully deleted Todo!" });
    });
  } catch (err) {
    res.status(500).json({ message: "Cannot delete Todo!" });
  }
};