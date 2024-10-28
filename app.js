const express = require("express");
const { sequelize } = require("./models");
const router = require("./router/index");
const cors = require("cors");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use("/api/v1", router);

sequelize
  .authenticate()
  .then(() => console.log("Database connected..."))
  .catch((err) => console.log("Error: " + err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
