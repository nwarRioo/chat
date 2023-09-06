import express, { Request, Response, Router } from 'express';
import IResponse from '../interfaces/IResponse';
import { Mongo, mongo } from '../repository/mongo';
export class AuthController {
    private repository: Mongo
    private router: Router
    constructor() {
        this.repository = mongo
        this.router = express.Router()
        this.router.post('/', this.login)
    }

    public getRouter = (): Router => {
        return this.router
    }

    private login = async (req: Request, res: Response): Promise<void> => {
        const response: IResponse<{ login: string; token: string } | undefined
        > = await this.repository.login(req.body)
        res.send(response)
    }
}