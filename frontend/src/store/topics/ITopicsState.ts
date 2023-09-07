import ITopicGetDto from "../../interfaces/ITopic/ITopicGetDto"

export default interface ITopicsState {
    topics: ITopicGetDto[]
    detailedTopic: ITopicGetDto
    showError: boolean
    errorMessage: string
    showAddError: boolean
    errorAddMessage: string
}
