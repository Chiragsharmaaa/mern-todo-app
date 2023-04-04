const express = require("express");
const sequelize = require("./util/database");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const userRoutes = require("./routes/user");
const todoRoutes = require("./routes/todo");

const User = require("./models/user");
const Todo = require("./models/todo");

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(bodyParser.json({ extended: false }));
app.use("/user", userRoutes);
app.use("/todo", todoRoutes);

User.hasMany(Todo);
Todo.belongsTo(User);

sequelize
  .sync()
  // .sync({ force: true })
  .then(() => {
    console.log("Database connected!");
    app.listen(process.env.PORT, () => {
      console.log(`Server started at port: ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error: ", err);
  });
