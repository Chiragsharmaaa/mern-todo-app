const express = require("express");
const router = express.Router();

const todoController = require("../controllers/todo");
const middleware = require("../middleware/auth");

router.post(
    "/createtodo",
    middleware.authentication,
    todoController.postAddTodo
);
router.post(
    "/updatestar/:id",
    middleware.authentication,
    todoController.postAddStar
);
router.post(
    "/updatedone/:id",
    middleware.authentication,
    todoController.postAddDone
);
router.get(
    "/getalltodos",
    middleware.authentication,
    todoController.getAllTodos
);
router.delete(
    "/deletetodo/:id",
    middleware.authentication,
    todoController.deleteTodo
);
module.exports = router;
