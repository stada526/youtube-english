import { ReactNode, useCallback, useEffect, useRef } from "react"
import { Segment, Word } from "../../domain"

type CaptionProps = {
    segments: Segment[]
    segmentIndex: number
    wordIndex: number
    onClickWord: (segmentIndex:number, wordIndex: number) => void
}

export const Caption = (props: CaptionProps) => {
    const scrollAreaRef = useRef<HTMLUListElement>(null)

    const onTrack = useCallback((rect: { top: number, bottom: number }) => {
        if (!scrollAreaRef.current) {
            return
        }
        const scrollAreaRect = scrollAreaRef.current.getBoundingClientRect()
        if (scrollAreaRect.bottom - rect.bottom < 100) {
            const diff = rect.top - scrollAreaRect.top
            scrollAreaRef.current.scrollBy({top: diff - 50 , behavior: "smooth"})
        }
    }, [])

    return (
        <ul ref={scrollAreaRef} className="h-full overflow-auto space-y-3">
            {props.segments.map((segment, segmentIndex) => (
                <li key={segmentIndex}>
                    <PositionTracker
                        enabled={props.segmentIndex === segmentIndex}
                        onTrack={onTrack}
                    >
                        <SegmentBox
                            words={segment.words}
                            focusedWordIndex={props.segmentIndex === segmentIndex ? props.wordIndex : null}
                            onClickWord={(wordIndex) => {
                                props.onClickWord(segmentIndex, wordIndex)
                            }}
                        />
                    </PositionTracker>
                </li>
            ))}
        </ul>
    )
}

type PositionTrackerProps<T> = {
    children: ReactNode
    enabled: boolean
    onTrack: (rect: {top: number, bottom: number}) => void
}

const PositionTracker = <T,>(props: PositionTrackerProps<T>) => {
    const { children, enabled, onTrack } = props
    const ref = useRef<HTMLDivElement>(null)
    useEffect(() => {
        if (!enabled || !ref.current) {
            return;
        }
        const rect = ref.current.getBoundingClientRect()
        onTrack({
            top: rect.top,
            bottom: rect.bottom
        })
    }, [enabled, onTrack])
    return (
        <div ref={ref}>
            {children}
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
        <div className="border border-solid border-gray-400 px-5 py-2 space-x-2">
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
            onClick={props.onClick}
        >
            {props.word}
        </button>
    )
}