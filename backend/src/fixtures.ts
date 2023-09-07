import mongoose from 'mongoose';
import { User } from './models/User';
import dotenv from 'dotenv';
import { generateHash } from './helpers/generateHash';
import { Topic } from './models/Topic';
import { Message } from './models/Message';
dotenv.config()

mongoose.connect(String(process.env.MONGO_CLIENT_URL));

const db = mongoose.connection

db.once('open', async () => {
    try {
        await db.dropCollection('users')
        await db.dropCollection('topics')
        await db.dropCollection('messages')
    } catch (err) {
        console.log(err)
    }

    const [bonnie, clyde] = await User.create({
        login: "Bonnie",
        password: await generateHash("123")
    }, {
        login: "Clyde",
        password: await generateHash("123")
    })
    
    const [cars, planes] = await Topic.create({
        name: "About vehicles",
        user_id: bonnie._id
    }, {
        name: "About planes",
        user_id: clyde._id
    })

    const [message1, message2, message3, message4] = await Message.create({
        text: "Lorem ipusm 720",
        user_id: bonnie._id,
        topic_id: cars._id,
        datetime: new Date()
    }, {
        text: "Amazing crash",
        user_id: clyde._id,
        topic_id: cars._id,
        datetime: new Date()
    }, {
        text: "Amazing planes",
        user_id: bonnie._id,
        topic_id: planes._id,
        datetime: new Date(),
    }, {
        text: "Amazing crash",
        user_id: clyde._id,
        topic_id: planes._id,
        datetime: new Date()
    })


    console.log("Fixtures are created!")
    
    db.close()
})