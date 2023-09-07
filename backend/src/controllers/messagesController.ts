import express, { Router, Request, Response } from 'express';
import IResponse from '../interfaces/IResponse';
import { auth } from '../middlewares/auth';
import IRequestWithTokenData from '../interfaces/IRequestWithTokenData';
import { Mongo, mongo } from '../repository/mongo';
import IMessageGetDto from '../interfaces/IMessage/IMessageGetDto';
import IUserGetDto from '../interfaces/IUser/IUserGetDto';

export class MessagesController {
    private router: Router;
    private repository: Mongo;
    constructor() {
        this.router = express.Router();
        this.router.get('/', auth, this.getMessagesByTopic);
        this.router.post('/', auth, this.addMessage);
        this.repository = mongo;
    };

    public getRouter = (): Router => {
        return this.router;
    };

    private getMessagesByTopic = async (expressReq: Request, res: Response): Promise<void> => {
        const req = expressReq as IRequestWithTokenData
        const user = req.dataFromToken as IUserGetDto
        const response: IResponse<IMessageGetDto[] | undefined> = await this.repository.getMessagesByTopic(user.id, req.query?.topic as string);
        res.send(response);
    };

    private addMessage = async (expressReq: Request, res: Response): Promise<void> => {
        const req = expressReq as IRequestWithTokenData
        const user = req.dataFromToken as IUserGetDto
        const message = req.body
        const response = await this.repository.addMessage(user.id, message);
        res.send(response);
    };
    
    
};
