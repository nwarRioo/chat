import IResponse from "../interfaces/IResponse";
import IUserCreateDto from "../interfaces/IUser/IUserCreateDto";
import IUserGetDto from "../interfaces/IUser/IUserGetDto";
import { instance } from "./instance"

class UserApi {
    
    public login = async (user: IUserGetDto): Promise<IResponse<IUserGetDto | string>> => {
        try {
            const response = await instance.post('/users/login', user);
            return response.data;
        } catch (err: unknown) {
            const error = err as Error;
            const response = {
                status: error.name,
                result: error.message,
            };
            return response;
        }
    };

    public register = async (user: IUserCreateDto): Promise<IResponse<IUserGetDto | string>> => {
        try {
            const response = await instance.post('/users', user);
            return response.data;
        } catch (err: unknown) {
            const error = err as Error;
            const response = {
                status: error.name,
                result: error.message,
            };
            return response;
        }
    };

    public checkToken = async (): Promise<IResponse<IUserGetDto | undefined>> => {
        try {
            const response = await instance.get('/users/token');
            return response.data;
        } catch (err: unknown) {
            const error = err as Error
            const response: IResponse<undefined> = {
                status: error.message,
                result: undefined,
            };
            return response;
        }
    };
}

export const userApi = new UserApi();
