import mongoose, { Schema } from "mongoose";
import IMessage from "../interfaces/IMessage/IMessage";

const MessageSchema: Schema = new Schema<IMessage>({
    user_id: {
        type: String,
        ref: 'User',
        required: true
    },
    topic_id: {
        type: String,
        ref: 'User',
        required: true
    },
    text: {
        type: String,
        required: true
    }
}, {
    versionKey: false
});

export const Message = mongoose.model<IMessage>('Message', MessageSchema);
