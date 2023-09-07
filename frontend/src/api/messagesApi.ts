import IMessageCreateDto from "../interfaces/IMessage/IMessageCreateDto";
import IMessageWithUser from "../interfaces/IMessage/IMessageWithUser";
import IResponse from "../interfaces/IResponse";
import { instance } from "./instance";

class MessagesApi {
    public getMessagesByTopicId = async (topicId: string): Promise<IResponse<IMessageWithUser[] | undefined>> => {
        try {
            const response = await instance.get(`/messages?topic=${topicId}`);
            return response.data;
        } catch (err: unknown) {
            const error = err as Error;
            return {
                status: error.message,
                result: undefined,
            };
        };
    };

    public addMessage = async (message: IMessageCreateDto): Promise<IResponse<IMessageWithUser | undefined>> => {
        try {
            const response = await instance.post('/messages', message);
            return response.data;
        } catch (err: unknown) {
            const error = err as Error;
            return {
                status: error.message,
                result: undefined,
            };
        };
    };
};

export const messagesApi = new MessagesApi();
