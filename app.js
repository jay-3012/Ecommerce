import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import artsRoute from './routes/artsRoute.js';
import userRoute from './routes/userRoute.js';
import cors from 'cors';
import path from 'path'
import { dir } from 'console';

const app = express();

// middleware
app.use(cors());
app.use(express.json()); //for parsing of data into the json

dotenv.config();

const port = process.env.PORT;
const uri = process.env.mongoURI;
try {
  mongoose.connect(uri);
  console.log("Connection Successfull");
} catch (error) {
  console.log(error);
}

// define routes
app.use("/art",artsRoute);
app.use('/user',userRoute);

// deployment
if(process.env.NODE_ENV === "production"){
  const dirpath = path.resolve();
  app.use(express.static("Public/dist"));
  app.get("*", (req,res)=>{
    res.sendFile(path.resolve(dirpath,"Public","dist", "index.html"))
  })
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});