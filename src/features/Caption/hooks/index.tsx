import { useCallback, useState } from "react"
import { Segment, findSegmentIndexAt, findWordIndexAt } from "../domain"



type UseCaption = {
    segmentIndex: number
    wordIndex: number
    focusWordAtSeconds: (currentTime: number) => void
    focusWordAtIndices: (segmentIndex: number, wordIndex: number) => void
}

export const useCaption = (segments: Segment[]): UseCaption => {
    const [segmentIndex, setSegmentIndex] = useState(0);
    const [wordIndex, setWordIndex] = useState(0);

    const focusWordAtIndices = useCallback((segmentIndex: number, wordIndex: number): void => {
        setSegmentIndex(segmentIndex)
        setWordIndex(wordIndex)
    },[])

    const focusWordAtSeconds = useCallback((currentTime: number): void => {
        const segmentIndexOption = findSegmentIndexAt(segments, currentTime)
        if (segmentIndexOption.type === "none") {
            return
        }
        const nextSegmentIndex = segmentIndexOption.value
        setSegmentIndex(nextSegmentIndex)

        const wordIndexOption = findWordIndexAt(segments[nextSegmentIndex].words, currentTime)
        if (wordIndexOption.type === "none") {
            return
        }
        setWordIndex(wordIndexOption.value)
    }, [segments])

    return {
        segmentIndex,
        wordIndex,
        focusWordAtSeconds,
        focusWordAtIndices
    }
}

