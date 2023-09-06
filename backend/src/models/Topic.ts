import mongoose, { Schema } from "mongoose";
import ITopic from "../interfaces/ITopic/ITopic";


const TopicSchema: Schema = new Schema<ITopic>({
    name: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        ref: 'User',
        required: true
    }
}, {
    versionKey: false
});

export const Topic = mongoose.model<ITopic>('Topic', TopicSchema);
