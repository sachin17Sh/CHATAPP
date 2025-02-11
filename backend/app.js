import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import UserModel from './model/Model.js';

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/crud")
  .then(() => {
    console.log("MongoDB connected successfully.");
  })
  .catch((err) => {
    console.error("MongoDB connection error: ", err);
  });

  app.get('/getUsers', (req, res) => {
    UserModel.find()
      .then(users => {
        res.json(users);
      })
      .catch(err => {
        console.error("Error fetching users: ", err);
        res.status(500).json({ error: "An error occurred while fetching users.", details: err });
      });
  });
  

app.listen(5050, () => {
  console.log("Server is running at port 5050");
});
