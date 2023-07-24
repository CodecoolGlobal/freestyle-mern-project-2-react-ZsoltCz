require("dotenv").config({ path: "config.env" });
const mongoose = require("mongoose");

const User = require("./model/User");

const express = require("express");
const app = express();

const port = 3001;

mongoose
  .connect(process.env.CONSTRING)
  .then(() => {
    console.log("Succesfully connected to database");
    app.listen(port, () => {
      console.log(`Listening on ${port}`);
    });
  })
  .catch((error) => console.error(error));

app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PATCH, PUT");
  next();
});

app.get("/api/v1/profile/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).send("Not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Not found");
  }
});

app.post("/api/v1/register", async (req, res) => {
  try {
    const user = await User.create({ ...req.body });
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error");
  }
});

app.put("/api/v1/profile/:id", async (req, res) => {
    console.log(req.body);
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    );
    console.log(user)
    if (user) {
      res.json(user);
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error");
  }
});

app.delete("/api/v1/profile/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    console.log(req.params.id);

    console.log(user);
    if (user) {
      res.send("Successfully deleted user");
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error");
  }
});

app.post("/api/v1/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    console.log(user);
    if (user) {
      if (user.password === req.body.password) {
        res.status(200).json(user);
      } else {
        res.status(401).send("Incorrect password");
      }
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    console.error(error);
  }
});
