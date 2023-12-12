import express, { response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookmodels.js";
import router from "./routes/bookRoute.js";
import cors from "cors"

const app  = express();
app.use(express.json());
app.use(cors());
app.use('/books', router);

mongoose.connect(mongoDBURL)
.then(()=>{
    
        console.log(`App is connecting to DB`);
        app.listen(PORT,()=>{
            console.log(`App is listing on ${PORT}`);
        });
    })
    .catch((err)=>{
        console.log(`Could not connect to mongoDB`)
        console.log(err);
    })