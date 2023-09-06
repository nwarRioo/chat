import express, { Request, Response, Router } from 'express';
import IResponse from '../interfaces/IResponse';
import { Mongo, mongo } from '../repository/mongo';
import IUserGetDto from '../interfaces/IUser/IUserGetDto';

export class UsersController {
    private repository: Mongo
    private router: Router
    constructor() {
        this.repository = mongo
        this.router = express.Router()
        this.router.post('/', this.register)
    }

    public getRouter = (): Router => {
        return this.router
    }

    private register = async (req: Request, res: Response): Promise<void> => {
        const response: IResponse<IUserGetDto | undefined> = await this.repository.register(req.body)
        res.send(response)
    }
}