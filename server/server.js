require("dotenv").config({ path: "config.env" });
const mongoose = require("mongoose");

const User = require("./model/User");

const express = require("express");
const app = express();

const bcrypt = require('bcrypt');

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
      return res.json(user);
    }
    throw new Error("Not found");
  } catch (error) {
    next(error);
  }
});

app.post("/api/v1/register", async (req, res, next) => {
  const { email, userName, password } = req.body;
  try {
    const existingUser = await User.findOne({ email: email });
    if (!existingUser) {
      const user = await User.create({ email, userName, password });
      return res.json(user);
    }
    throw new Error("E-mail already in use");
  } catch (error) {
    next(error);
  }
});

app.put("/api/v1/profile/:id", async (req, res, next) => {
    const { userName, email, favorites } = req.body;
  try {
    const user = await User.findById(
      req.params.id
    );
    if (user) {
      user.userName = userName;
      user.email = email;
      user.favorites = favorites;
      await user.save({ validateModifiedOnly: true });
      return res.json(user);
    }
    throw new Error("User not found");
  } catch (error) {
    next(error);
  }
});

app.put("/api/v1/profile/:id/changepassword", async (req, res, next) => {
  const { password, newPassword } = req.body;
  try {
      const user = await User.findById(req.params.id).select("+password");
      if (user) {
        bcrypt.compare(password, user.password, async (err, match) => {
          try {
            if (err) {
                throw new Error("An error has occured");
            }
            if (match) {
                user.password = newPassword;
                await user.save();
                return res.json({message: "Password changed successfully"});
            }
            throw new Error("Wrong old password");
          } catch (error) {
            next(error);
          }
        });
      }
      else {
        throw new Error("User not found");
      }
  } catch (error) {
      next(error);
  }
});

app.delete("/api/v1/profile/:id", async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (user) {
      return res.send("Successfully deleted user");
    }
    throw new Error("Failed to delete user")
  } catch (error) {
    next(error);
  }
});

app.post("/api/v1/login", async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email }).select("+password");
    if (user) {
      bcrypt.compare(req.body.password, user.password, (err, match) => {
        if (err) {
          throw new Error("An error has occured");
        }
        if (match) {
          user.password = undefined;
          return res.status(200).json(user);
        }
        return next(new Error("Incorrect credentials"));
      });
    } else {
      throw new Error("Incorrect credentials");
    }
  } catch (error) {
    next(error);
  }
});

app.use((error, req, res, next) => {
    res.status(400).json({error: error.message});
});