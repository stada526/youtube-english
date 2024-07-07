export type Segment = Readonly<{
    start: number
    end: number
    text: string
    words: Word[]
}>

export type Word = Readonly<{
    word: string
    start: number
    end: number
}>

export const findSegmentIndexAt = (segments: Segment[], seconds: number): Option<number> => {
    for (let i=0; i<segments.length; i++) {
        const segment = segments[i]
        if (segment.start <= seconds && seconds <= segment.end) {
            return Some(i)
        }
    }
    return None()
}

export const findWordIndexAt = (words: Word[], seconds: number): Option<number> => {
    for (let i=0; i<words.length; i++) {
        const word = words[i]
        if (word.start <= seconds && seconds <= word.end) {
            return Some(i)
        }
    }
    return None()
}

const Some = <T>(value: T): Some<T> => ({ type: "some", value })
const None = (): None => ({ type: "none" })

type Option<T> = Some<T> | None

type Some<T> = {
    type: "some"
    value: T
}

type None = {
    type: "none"
}