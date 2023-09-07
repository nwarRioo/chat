
export default interface IResponse<T> {
    status: number | string
    result: T
}