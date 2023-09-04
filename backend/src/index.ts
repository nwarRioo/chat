import express, { Express } from "express";
import dotenv from 'dotenv';
import { mongo } from "./repository/mongo";
import { UsersController } from "./controllers/usersController"
dotenv.config();

class App {
    private app: Express
    constructor() {
        this.app = express();
        this.app.use(express.json());
    };

    public init = async (): Promise<void> => {
        try {
            await mongo.init();
            process.on('exit', () => {
                mongo.close();
            });
            this.app.use('/users', new UsersController().getRouter());
            this.app.listen(process.env.APP_PORT, () => {
                console.log(`Server is running on port ${process.env.APP_PORT}`);
            });

        } catch (err) {
            console.log(err);
        };
    };
};

const app = new App();
app.init();