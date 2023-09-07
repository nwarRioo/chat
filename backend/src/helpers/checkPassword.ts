import bcrypt from "bcrypt";
import IUser from "../interfaces/IUser/IUser";

export const checkPassword = async (password: string, instance: IUser) => {
    return await bcrypt.compare(password, instance.password);
};