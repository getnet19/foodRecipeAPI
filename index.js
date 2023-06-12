const express = require("express");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const recipeRoutes = require("./routes/recipe");

const dbConnect = require("./config/db");
const app = express();
app.use(express.json());

//databse connection
dbConnect();

//routing
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/recipe", recipeRoutes);

const port = 4000;
app.listen(4000, () => {
  console.log(`server is running on ${port}`);
});
