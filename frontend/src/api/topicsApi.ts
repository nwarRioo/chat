import IResponse from "../interfaces/IResponse";
import ITopicGetDto from "../interfaces/ITopic/ITopicGetDto";
import { instance } from "./instance";

class TopicsApi {
    public getTopics = async (): Promise<IResponse<ITopicGetDto[] | undefined>> => {
        try {
            const response = await instance.get('/topics');
            return response.data;
        } catch (err: unknown) {
            const error = err as Error;
            const response = {
                status: error.message,
                result: undefined,
            };
            return response;
        }
    };

    public getTopicById = async (id: string): Promise<IResponse<ITopicGetDto | undefined>> => {
        try {
            const response = await instance.get(`/topics/${id}`);
            return response.data;
        } catch (err: unknown) {
            const error = err as Error;
            const response = {
                status: error.message,
                result: undefined,
            };
            return response;
        }
    };
}

export const topicsApi = new TopicsApi();
