import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import IResponse from "../interfaces/IResponse";
import { StatusCodes } from "http-status-codes";
import IRequestWithTokenData from "../interfaces/IRequestWithTokenData";

export const auth = (expressReq: Request, res: Response, next: NextFunction) => {
    const req = expressReq as IRequestWithTokenData
    if (req.method === 'OPTIONS') {
        next();
    };
    try {
        const data = jwt.verify(req.get('Authorization') || '', process.env.SECRET_KEY || '');
        if (data) {
            req.dataFromToken = data
            next()
        } 
    } catch {
        const response: IResponse<undefined> = {
            status: StatusCodes.NON_AUTHORITATIVE_INFORMATION,
            result: undefined,
        };
        res.status(200).send(response);
    };
};
