import mongoose, { Model, Schema } from "mongoose";
import IUser from "../interfaces/IUser/IUser";


type UserModel = Model<IUser>;

const UserSchema: Schema = new Schema<IUser, UserModel>({
    login: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    versionKey: false
});

UserSchema.set('toJSON', {
    transform(doc, ret, options) {
        delete ret.password
        return ret
    },
});

export const User = mongoose.model<IUser, UserModel>('User', UserSchema);