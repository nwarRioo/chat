import mongoose from 'mongoose';
import { User } from './models/User';
import dotenv from 'dotenv';
import { generateHash } from './helpers/generateHash';
dotenv.config()

mongoose.connect(String(process.env.MONGO_CLIENT_URL));

const db = mongoose.connection

db.once('open', async () => {
    try {
        await db.dropCollection('users')
        await User.create({
            login: "user1",
            password: await generateHash("password1")
        }, {
            login: "Michele ",
            password: await generateHash("password145")
        }, {
            login: "user15 ",
            password: await generateHash("passwordPass")
        }, {
            login: "cassandra ",
            password: await generateHash("passwordP")
        })
        console.log("Fixtures are created!")
    } catch (err) {
        console.log(err)
    }
    db.close()
})