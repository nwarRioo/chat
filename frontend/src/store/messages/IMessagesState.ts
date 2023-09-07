import IMessageGetDto from "../../interfaces/IMessage/IMessageGetDto"

export default interface IMessagesState {
    messages: IMessageGetDto[]
    showError: boolean
    errorMessage: string
    showAddError: boolean
    errorAddMessage: string
};
