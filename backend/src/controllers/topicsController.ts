import express, { Router, Request, Response } from 'express';
import IResponse from '../interfaces/IResponse';
import IRequestWithTokenData from '../interfaces/IRequestWithTokenData';
import { auth } from './middlewares/auth';
import ITopicGetDto from '../interfaces/ITopic/ITopicGetDto';
import IUserGetDto from '../interfaces/IUser/IUserGetDto';
import { Mongo, mongo } from '../repository/mongo';

export class TopicsController {
    private router: Router;
    private repository: Mongo;
    constructor() {
        this.router = express.Router();
        this.router.get('/', auth, this.getTopics);
        this.router.get('/:id', auth, this.getTopicById);
        this.router.post('/', auth, this.addTopic);
        this.repository = mongo;
    };

    public getRouter = (): Router => {
        return this.router;
    };

    private getTopics = async (expressReq: Request, res: Response): Promise<void> => {
        const req = expressReq as IRequestWithTokenData
        const user = req.dataFromToken as IUserGetDto
        const response: IResponse<ITopicGetDto[] | undefined> = await this.repository.getTopics();
        res.send(response);
    };

    private getTopicById = async (expressReq: Request, res: Response): Promise<void> => {
        const req = expressReq as IRequestWithTokenData
        const user = req.dataFromToken as IUserGetDto
        const response: IResponse<ITopicGetDto | undefined> =
            await this.repository.getTopicById(req.params.id);
        res.send(response);
    };

    private addTopic = async (expressReq: Request, res: Response): Promise<void> => {
        const req = expressReq as IRequestWithTokenData
        const user = req.dataFromToken as IUserGetDto
        const topic = req.body;
        const response = await this.repository.addTopic(user.id, topic);
        res.send(response);
    };
};
