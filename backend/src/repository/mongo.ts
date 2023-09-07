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
import ITopicGetDto from "../interfaces/ITopic/ITopicGetDto";
import ITopicCreateDto from "../interfaces/ITopic/ITopicCreateDto";
import { Topic } from "../models/Topic";
import ITopic from "../interfaces/ITopic/ITopic";
import IMessageGetDto from "../interfaces/IMessage/IMessageGetDto";
import IMessage from "../interfaces/IMessage/IMessage";
import IMessageCreateDto from "../interfaces/IMessage/IMessageCreateDto";
import { Message } from "../models/Message";

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
                token: generateJWT({ id: foundUser.id, login: foundUser.login })
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

    public getTopics = async (): Promise<IResponse<ITopicGetDto[] | undefined>> => {
        try {
            const topics = await Topic.find().populate('user_id').sort({ datetime: 'desc' });
            

            const response: IResponse<ITopicGetDto[]> = {
                status: StatusCodes.OK,
                result: topics,
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

    public getTopicById = async (id: string): Promise<IResponse<ITopicGetDto | undefined>> => {
        try {
            if (!id.match(/^[0-9a-fA-F]{24}$/)) throw new Error('Id is not valid!');
            const foundTopic: ITopicGetDto | null = await Topic.findById(id).populate('user_id');
            if (!foundTopic) throw new Error('This topic is not found.');

            const response: IResponse<ITopic | undefined> = {
                status: StatusCodes.OK,
                result: foundTopic,
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

    public addTopic = async (userId: string, topic: ITopicCreateDto): Promise<IResponse<ITopicGetDto | undefined>> => {
        try {
            const foundUser = await User.findById(userId);
            if (!foundUser) throw new Error('Unauthorized!');

            if (topic.name === undefined || topic.name.trim() === '') throw new Error('Topic name is required!');
            
            const newTopic = new Topic({ ...topic, user_id: userId });
            const data = await newTopic.save();
            const response: IResponse<ITopicGetDto> = {
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

    public addMessage = async (id: string, messageDto: IMessageCreateDto): Promise<IResponse<IMessageGetDto | undefined>> => {
        try {
            const user = await User.findById(id);
            if (!user) throw new Error('Unauthorized!');
            const topic = await Topic.findById(messageDto.topic_id);
            if (!topic) throw new Error('There is not this topic!');
            if (messageDto.text === undefined || messageDto.text.trim() === '')
                throw new Error('Text is required!');
            const message = new Message({ ...messageDto, 'user_id': user?._id })
            const data = await message.save()
            const response = {
                status: StatusCodes.OK,
                result: data,
            }
            return response
        } catch (err: unknown) {
            const error = err as Error
            const response: IResponse<undefined> = {
                status: StatusCodes.BAD_REQUEST,
                result: undefined,
            }
            return response
        }
    }

    public getMessagesByTopic = async (userId: string, id: string): Promise<IResponse<IMessageGetDto[] | undefined>> => {
        try {
            const user = await User.findById(userId);
            if (!user) throw new Error('Unauthorized!');
            const data = await Message.find({ topic_id: id }).sort({ datetime: 'asc' }).populate('user_id', 'login')
            const response: IResponse<IMessage[]> = {
                status: StatusCodes.OK,
                result: data,
            }
            return response

        } catch (err: unknown) {
            const error = err as Error
            const response: IResponse<undefined> = {
                status: StatusCodes.BAD_REQUEST,
                result: undefined,
            }
            return response
        }
    };


};

export const mongo = new Mongo();