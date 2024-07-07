import { Segment, Word } from "../../domain"

type CaptionProps = {
    segments: Segment[]
    segmentIndex: number
    wordIndex: number
    onClickWord: (segmentIndex:number, wordIndex: number) => void
}

export const Caption = (props: CaptionProps) => {
    return (
        <div>
            {props.segments.map((segment, segmentIndex) => {
                return (
                    <SegmentBox
                        key={segmentIndex}
                        words={segment.words}
                        focusedWordIndex={props.segmentIndex === segmentIndex ? props.wordIndex : null}
                        onClickWord={(wordIndex) => {
                            props.onClickWord(segmentIndex, wordIndex)
                        }}
                    />
                )
            })}
        </div>
    )
}


type SegmentProps = {
    words: Word[]
    focusedWordIndex: number | null
    onClickWord: (wordIndex: number) => void
}


const SegmentBox = (props: SegmentProps) => {
    return (
        <div className="border border-solid border-gray-400 px-5">
            {props.words.map((word, index) => (
                <WordItem
                    key={index}
                    word={word.word}
                    onClick={() => props.onClickWord(index)}
                    focused={props.focusedWordIndex===index}
                />
            ))}
        </div>
    )
}

type WordProps = {
    word: string
    focused: boolean
    onClick: () => void
}

const WordItem = (props: WordProps) => {
    const bgColor = props.focused ? "lightblue" : ""

    return (
        <button
            style={{ backgroundColor: bgColor }}
            className="pr-2"
            onClick={props.onClick}
        >
            {props.word}
        </button>
    )
}