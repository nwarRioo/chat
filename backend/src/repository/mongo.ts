import mongoose, { Mongoose } from "mongoose"
import { generateJWT } from "../helpers/generateJWT";
import IResponse from "../interfaces/IResponse";
import IUserLoginDto from "../interfaces/IUser/IUserLoginDto";
import { User } from "../models/User";
import { StatusCodes } from "http-status-codes";
import IUserCreateDto from "../interfaces/IUser/IUserCreateDto";
import IUserGetDto from "../interfaces/IUser/IUserGetDto";
import { checkPassword } from "../helpers/checkPassword";
import { generateHash } from "../helpers/generateHash";

export class Mongo {
    private client: Mongoose | null = null;

    public close = async (): Promise<void> => {
        if (!this.client) return;
        await this.client.disconnect();
    };

    public init = async (): Promise<void> => {
        this.client = await mongoose.connect(process.env.MONGO_CLIENT_URL || '');
        console.log('MongoDB is connected');
    };

    public register = async (user: IUserCreateDto): Promise<IResponse<IUserGetDto | undefined>> => {
        try {
            if (user.login === undefined || user.login.trim() === '')
                throw new Error('Login is required!');
            if (user.password === undefined || user.password.trim() === '')
                throw new Error('Password is required!');

            const exists = await User.exists({ username: user.login })
            if (exists) throw new Error('This login is already registered!');
            user.password = await generateHash(user.password);
            const newUser = new User(user);
            await newUser.save();
            const data= {
                id: String(newUser.id),
                login: newUser.login,
                token: generateJWT({ id: newUser.id, username: newUser.login })
            };
            const response: IResponse<IUserGetDto> = {
                status: StatusCodes.CREATED,
                result: data,
            };
            return response;
        } catch (err: unknown) {
            const error = err as Error
            const response: IResponse<undefined> = {
                status: StatusCodes.BAD_REQUEST,
                result: undefined,
            };
            return response;
        };
    };

    public login = async (user: IUserLoginDto): Promise<IResponse<{ login: string, token: string } | undefined>> => {
        try {
            if (user.login === undefined || user.login.trim() === '')
                throw new Error('Username is required!');
            if (user.password === undefined || user.password.trim() === '')
                throw new Error('Password is required!');

            const foundUser = await User.findOne({ login: user.login });
            if (!foundUser) throw new Error('User is not found!');

            const isMatch: boolean = await checkPassword(user.password, foundUser);
            if (!isMatch) throw new Error('Wrong password!');

            await foundUser.save();
            const data = {
                login: foundUser.login,
                token: generateJWT({ id: foundUser.id, username: foundUser.login })
            };
            const response = {
                status: StatusCodes.OK,
                result: data,
            };

            return response;
        } catch (err: unknown) {
            const error = err as Error
            const response: IResponse<undefined> = {
                status: StatusCodes.BAD_REQUEST,
                result: undefined,
            };
            return response;
        };
    };

};

export const mongo = new Mongo();