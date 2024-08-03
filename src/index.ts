import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });
import express from "express";
import connectDB  from "./config/db.js";
import loaders from "./loaders/index.js"
const app = express();
const port = process.env.PORT || 8000;

loaders({app});

// database connection
connectDB()
    .then(()=>{
        app.listen(port, ()=>{
            console.log(`Server started at: ${port}`);
        });
        app.on("error",(err)=>{
            console.log("App failed !!!", err);
        });
    })
    .catch((err)=>{
        console.log("Mongodb data conn fail !!!", err);
    }
);

export default app;