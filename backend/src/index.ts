import express, { Express } from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import { mongo } from "./repository/mongo";
import { UsersController } from "./controllers/usersController"
import { AuthController } from "./controllers/authController";
import { TopicsController } from "./controllers/topicsController";
import { MessagesController } from "./controllers/messagesController";
dotenv.config();

class App {
    private app: Express
    constructor() {
        this.app = express();
        this.app.use(express.json());
        this.app.use(cors());
    };

    public init = async (): Promise<void> => {
        try {
            await mongo.init();
            process.on('exit', () => {
                mongo.close();
            });
            this.app.use('/users', new UsersController().getRouter());
            this.app.use('/auth', new AuthController().getRouter());
            this.app.use('/topics', new TopicsController().getRouter());
            this.app.use('/messages', new MessagesController().getRouter());
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