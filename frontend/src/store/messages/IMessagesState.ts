import IMessageWithUser from "../../interfaces/IMessage/IMessageWithUser"

export default interface IMessagesState {
    messages: IMessageWithUser[]
    showError: boolean
    errorMessage: string
    showAddError: boolean
    errorAddMessage: string
};
