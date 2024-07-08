
export const Some = <T>(value: T): Some<T> => ({ type: "some", value })
export const None = (): None => ({ type: "none" })
export type Option<T> = Some<T> | None
export type Some<T> = {
    type: "some"
    value: T
}
export type None = {
    type: "none"
}
