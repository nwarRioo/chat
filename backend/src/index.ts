import express, { Express } from "express";
import dotenv from 'dotenv';
dotenv.config();

const app: Express = express();

const run = async () => {
    app.listen(process.env.APP_PORT,
        () => {
            console.log(`Server is running on port ${process.env.APP_PORT}`);
        });
}

run()
.then(() => {
    console.log("Everything is OK")
})
.catch((err) => {
    console.log(err)
})
