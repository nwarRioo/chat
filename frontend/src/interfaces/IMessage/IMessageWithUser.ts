export default interface IMessageWithUser {
    _id: string
    text: string
    datetime: string
    user_id: {
        _id: string
        login: string
    }
    topic_id: string
}