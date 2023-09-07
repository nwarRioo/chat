import express, { Request, Response, Router } from 'express';
import IResponse from '../interfaces/IResponse';
import { Mongo, mongo } from '../repository/mongo';
import IUserGetDto from '../interfaces/IUser/IUserGetDto';
import { auth } from '../middlewares/auth';
import { StatusCodes } from 'http-status-codes';
import IRequestWithTokenData from '../interfaces/IRequestWithTokenData';

export class UsersController {
    private repository: Mongo
    private router: Router
    constructor() {
        this.repository = mongo
        this.router = express.Router()
        this.router.post('/', this.register)
        this.router.get('/token', auth, this.checkToken)
    }

    public getRouter = (): Router => {
        return this.router
    }

    private register = async (req: Request, res: Response): Promise<void> => {
        const response: IResponse<IUserGetDto | undefined> = await this.repository.register(req.body)
        res.send(response)
    }

    private checkToken = async (
        expressReq: Request,
        res: Response,
    ): Promise<void> => {
        const req = expressReq as IRequestWithTokenData
        const response: IResponse<IUserGetDto | undefined> = {
        status: StatusCodes.OK,
        result: req.dataFromToken as IUserGetDto,
        }
        res.send(response)
    }

}