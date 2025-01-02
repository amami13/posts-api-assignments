import dotenv from 'dotenv';
dotenv.config();
import mongoose from "mongoose";
import bodyparser from "body-parser";
import express, {Express} from "express";
import postsRoute from "./routes/posts_routes";

const app = express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true })); 
app.use("/posts", postsRoute);

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to database"));

const initApp = () => {
    return new Promise<Express>((resolve, reject) => {
        if (!process.env.MONGO_URI) {
            reject("MONGO_URI is not set");
        } else {
            mongoose.connect(process.env.MONGO_URI)
            .then(() => {
                console.log("Connected to database");
                resolve(app);
            })
            .catch((error) => {
                console.error("Error connecting to database", error);
                reject(error);
            });
        }
    });
};

export default initApp;