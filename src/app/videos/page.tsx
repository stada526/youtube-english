"use client";
import React, { MutableRefObject, useRef, useState } from 'react';
import YouTube, { YouTubeEvent, YouTubePlayer } from 'react-youtube';

const Transcripts = [{ 'word': ' A', 'start': 16.06, 'end': 16.36 }, { 'word': ' few', 'start': 16.36, 'end': 16.42 }, { 'word': ' years', 'start': 16.42, 'end': 16.76 }, { 'word': ' ago,', 'start': 16.76, 'end': 17.26 }, { 'word': ' I', 'start': 17.68, 'end': 17.8 }, { 'word': ' felt', 'start': 17.8, 'end': 18.0 }, { 'word': ' like', 'start': 18.0, 'end': 18.2 }, { 'word': ' I', 'start': 18.2, 'end': 18.28 }, { 'word': ' was', 'start': 18.28, 'end': 18.52 }, { 'word': ' stuck', 'start': 18.52, 'end': 18.88 }, { 'word': ' in', 'start': 18.88, 'end': 19.28 }, { 'word': ' a', 'start': 19.28, 'end': 19.42 }, { 'word': ' rut.', 'start': 19.42, 'end': 19.68 }, { 'word': ' So', 'start': 20.36, 'end': 20.64 }, { 'word': ' I', 'start': 20.64, 'end': 20.7 }, { 'word': ' decided', 'start': 20.7, 'end': 21.06 }, { 'word': ' to', 'start': 21.06, 'end': 21.28 }, { 'word': ' follow', 'start': 21.28, 'end': 21.5 }, { 'word': ' in', 'start': 21.5, 'end': 21.66 }, { 'word': ' the', 'start': 21.66, 'end': 21.8 }, { 'word': ' footsteps', 'start': 21.8, 'end': 22.18 }, { 'word': ' of', 'start': 22.18, 'end': 22.42 }, { 'word': ' the', 'start': 22.42, 'end': 22.6 }, { 'word': ' great', 'start': 22.6, 'end': 22.92 }, { 'word': ' American', 'start': 22.92, 'end': 23.58 }, { 'word': ' philosopher,', 'start': 23.58, 'end': 24.3 }, { 'word': ' Morgan', 'start': 24.78, 'end': 25.0 }, { 'word': ' Spurlock,', 'start': 25.0, 'end': 25.5 }, { 'word': ' and', 'start': 25.82, 'end': 26.26 }, { 'word': ' try', 'start': 26.26, 'end': 26.52 }, { 'word': ' something', 'start': 26.52, 'end': 26.84 }, { 'word': ' new', 'start': 26.84, 'end': 27.24 }, { 'word': ' for', 'start': 27.24, 'end': 27.44 }, { 'word': ' 30', 'start': 27.44, 'end': 27.64 }, { 'word': ' days.', 'start': 27.64, 'end': 28.06 }, { 'word': ' The', 'start': 28.06, 'end': 29.02 }, { 'word': ' idea', 'start': 29.02, 'end': 29.32 }, { 'word': ' is', 'start': 29.32, 'end': 29.62 }, { 'word': ' actually', 'start': 29.62, 'end': 29.96 }, { 'word': ' pretty', 'start': 29.96, 'end': 30.24 }, { 'word': ' simple.', 'start': 30.24, 'end': 30.64 }, { 'word': ' Think', 'start': 31.1, 'end': 31.32 }, { 'word': ' about', 'start': 31.32, 'end': 31.58 }, { 'word': ' something', 'start': 31.58, 'end': 31.86 }, { 'word': " you've", 'start': 31.86, 'end': 32.12 }, { 'word': ' always', 'start': 32.12, 'end': 32.48 }, { 'word': ' wanted', 'start': 32.48, 'end': 32.72 }, { 'word': ' to', 'start': 32.72, 'end': 33.04 }, { 'word': ' add', 'start': 33.04, 'end': 33.28 }, { 'word': ' to', 'start': 33.28, 'end': 33.36 }, { 'word': ' your', 'start': 33.36, 'end': 33.6 }, { 'word': ' life', 'start': 33.6, 'end': 33.94 }, { 'word': ' and', 'start': 33.94, 'end': 34.42 }, { 'word': ' try', 'start': 34.42, 'end': 34.68 }, { 'word': ' it', 'start': 34.68, 'end': 35.22 }, { 'word': ' for', 'start': 35.22, 'end': 35.5 }, { 'word': ' the', 'start': 35.5, 'end': 35.56 }, { 'word': ' next', 'start': 35.56, 'end': 35.8 }, { 'word': ' 30', 'start': 35.8, 'end': 36.02 }, { 'word': ' days.', 'start': 36.02, 'end': 36.44 }, { 'word': ' It', 'start': 37.34, 'end': 37.44 }, { 'word': ' turns', 'start': 37.44, 'end': 37.62 }, { 'word': ' out', 'start': 37.62, 'end': 38.18 }, { 'word': ' 30', 'start': 38.18, 'end': 38.42 }, { 'word': ' days', 'start': 38.42, 'end': 38.68 }, { 'word': ' is', 'start': 38.68, 'end': 38.92 }, { 'word': ' just', 'start': 38.92, 'end': 39.24 }, { 'word': ' about', 'start': 39.24, 'end': 39.56 }, { 'word': ' the', 'start': 39.56, 'end': 39.72 }, { 'word': ' right', 'start': 39.72, 'end': 39.9 }, { 'word': ' amount', 'start': 39.9, 'end': 40.1 }, { 'word': ' of', 'start': 40.1, 'end': 40.34 }, { 'word': ' time', 'start': 40.34, 'end': 40.54 }, { 'word': ' to', 'start': 40.54, 'end': 40.68 }, { 'word': ' add', 'start': 40.68, 'end': 40.88 }, { 'word': ' a', 'start': 40.88, 'end': 40.98 }, { 'word': ' new', 'start': 40.98, 'end': 41.14 }, { 'word': ' habit', 'start': 41.14, 'end': 41.44 }, { 'word': ' or', 'start': 41.44, 'end': 42.32 }, { 'word': ' subtract', 'start': 42.32, 'end': 42.86 }, { 'word': ' a', 'start': 42.86, 'end': 43.1 }, { 'word': ' habit,', 'start': 43.1, 'end': 43.3 }, { 'word': ' like', 'start': 43.5, 'end': 43.8 }, { 'word': ' watching', 'start': 43.8, 'end': 44.14 }, { 'word': ' the', 'start': 44.14, 'end': 44.34 }, { 'word': ' news,', 'start': 44.34, 'end': 44.64 }, { 'word': ' from', 'start': 44.98, 'end': 45.2 }, { 'word': ' your', 'start': 45.2, 'end': 45.38 }, { 'word': ' life.', 'start': 45.38, 'end': 45.72 }, { 'word': " There's", 'start': 46.34, 'end': 46.54 }, { 'word': ' a', 'start': 46.54, 'end': 46.66 }, { 'word': ' few', 'start': 46.66, 'end': 46.76 }, { 'word': ' things', 'start': 46.76, 'end': 46.98 }, { 'word': ' that', 'start': 46.98, 'end': 47.12 }, { 'word': ' I', 'start': 47.12, 'end': 47.28 }, { 'word': ' learned', 'start': 47.28, 'end': 47.44 }, { 'word': ' while', 'start': 47.44, 'end': 47.66 }, { 'word': ' doing', 'start': 47.66, 'end': 47.84 }, { 'word': ' these', 'start': 47.84, 'end': 48.14 }, { 'word': ' 30', 'start': 48.14, 'end': 48.32 }, { 'word': '-day', 'start': 48.32, 'end': 48.5 }, { 'word': ' challenges.', 'start': 48.5, 'end': 48.94 }, { 'word': ' The', 'start': 49.96, 'end': 50.22 }, { 'word': ' first', 'start': 50.22, 'end': 50.48 }, { 'word': ' was,', 'start': 50.48, 'end': 50.96 }, { 'word': ' instead', 'start': 51.14, 'end': 51.44 }, { 'word': ' of', 'start': 51.44, 'end': 51.6 }, { 'word': ' the', 'start': 51.6, 'end': 51.78 }, { 'word': ' months', 'start': 51.78, 'end': 52.06 }, { 'word': ' flying', 'start': 52.06, 'end': 52.64 }, { 'word': ' by', 'start': 52.64, 'end': 53.16 }, { 'word': ' forgotten,', 'start': 53.16, 'end': 53.64 }, { 'word': ' the', 'start': 54.44, 'end': 54.68 }, { 'word': ' time', 'start': 54.68, 'end': 54.84 }, { 'word': ' was', 'start': 54.84, 'end': 55.14 }, { 'word': ' much', 'start': 55.14, 'end': 55.5 }, { 'word': ' more', 'start': 55.5, 'end': 56.22 }, { 'word': ' memorable.', 'start': 56.22, 'end': 56.7 }, { 'word': ' This', 'start': 56.7, 'end': 57.6 }, { 'word': ' was', 'start': 57.6, 'end': 57.82 }, { 'word': ' part', 'start': 57.82, 'end': 58.0 }, { 'word': ' of', 'start': 58.0, 'end': 58.1 }, { 'word': ' a', 'start': 58.1, 'end': 58.24 }, { 'word': ' challenge', 'start': 58.24, 'end': 58.46 }, { 'word': ' I', 'start': 58.46, 'end': 58.64 }, { 'word': ' did', 'start': 58.64, 'end': 58.74 }, { 'word': ' to', 'start': 58.74, 'end': 58.9 }, { 'word': ' take', 'start': 58.9, 'end': 59.02 }, { 'word': ' a', 'start': 59.02, 'end': 59.16 }, { 'word': ' picture', 'start': 59.16, 'end': 59.46 }, { 'word': ' every', 'start': 59.46, 'end': 59.84 }, { 'word': ' day', 'start': 59.84, 'end': 60.0 }, { 'word': ' for', 'start': 60.0, 'end': 60.18 }, { 'word': ' a', 'start': 60.18, 'end': 60.3 }, { 'word': ' month,', 'start': 60.3, 'end': 60.62 }, { 'word': ' and', 'start': 61.02, 'end': 61.04 }, { 'word': ' I', 'start': 61.04, 'end': 61.32 }, { 'word': ' remember', 'start': 61.32, 'end': 61.66 }, { 'word': ' exactly', 'start': 61.66, 'end': 62.5 }, { 'word': ' where', 'start': 62.5, 'end': 63.0 }, { 'word': ' I', 'start': 63.0, 'end': 63.22 }, { 'word': ' was', 'start': 63.22, 'end': 63.6 }, { 'word': ' and', 'start': 63.6, 'end': 63.94 }, { 'word': ' what', 'start': 63.94, 'end': 64.14 }, { 'word': ' I', 'start': 64.14, 'end': 64.24 }, { 'word': ' was', 'start': 64.24, 'end': 64.42 }, { 'word': ' doing', 'start': 64.42, 'end': 64.6 }, { 'word': ' that', 'start': 64.6, 'end': 64.82 }, { 'word': ' day.', 'start': 64.82, 'end': 65.16 }, { 'word': ' I', 'start': 66.38, 'end': 66.66 }, { 'word': ' also', 'start': 66.66, 'end': 66.96 }, { 'word': ' noticed', 'start': 66.96, 'end': 67.4 }, { 'word': ' that', 'start': 67.4, 'end': 67.8 }, { 'word': ' as', 'start': 67.8, 'end': 68.02 }, { 'word': ' I', 'start': 68.02, 'end': 68.16 }, { 'word': ' started', 'start': 68.16, 'end': 68.34 }, { 'word': ' to', 'start': 68.34, 'end': 68.52 }, { 'word': ' do', 'start': 68.52, 'end': 68.66 }, { 'word': ' more', 'start': 68.66, 'end': 69.02 }, { 'word': ' and', 'start': 69.02, 'end': 69.34 }, { 'word': ' harder', 'start': 69.34, 'end': 69.62 }, { 'word': ' 30', 'start': 69.62, 'end': 69.88 }, { 'word': '-day', 'start': 69.88, 'end': 70.06 }, { 'word': ' challenges,', 'start': 70.06, 'end': 70.56 }, { 'word': ' my', 'start': 71.22, 'end': 71.24 }, { 'word': ' self', 'start': 71.24, 'end': 71.44 }, { 'word': '-confidence', 'start': 71.44, 'end': 71.86 }, { 'word': ' grew.', 'start': 71.86, 'end': 72.22 }, { 'word': ' I', 'start': 72.92, 'end': 73.06 }, { 'word': ' went', 'start': 73.06, 'end': 73.2 }, { 'word': ' from', 'start': 73.2, 'end': 73.42 }, { 'word': ' desk', 'start': 73.42, 'end': 73.76 }, { 'word': '-dwelling', 'start': 73.76, 'end': 74.1 }, { 'word': ' computer', 'start': 74.1, 'end': 74.64 }, { 'word': ' nerd', 'start': 74.64, 'end': 74.88 }, { 'word': ' to', 'start': 74.88, 'end': 75.42 }, { 'word': ' the', 'start': 75.42, 'end': 75.74 }, { 'word': ' kind', 'start': 75.74, 'end': 75.9 }, { 'word': ' of', 'start': 75.9, 'end': 76.02 }, { 'word': ' guy', 'start': 76.02, 'end': 76.14 }, { 'word': ' who', 'start': 76.14, 'end': 76.38 }, { 'word': ' bikes', 'start': 76.38, 'end': 76.7 }, { 'word': ' to', 'start': 76.7, 'end': 76.96 }, { 'word': ' work', 'start': 76.96, 'end': 77.54 }, { 'word': ' for', 'start': 77.54, 'end': 78.28 }, { 'word': ' fun.', 'start': 78.28, 'end': 78.78 }, { 'word': ' Even', 'start': 80.5, 'end': 80.82 }, { 'word': ' last', 'start': 80.82, 'end': 81.18 }, { 'word': ' year,', 'start': 81.18, 'end': 81.48 }, { 'word': ' I', 'start': 81.62, 'end': 81.72 }, { 'word': ' ended', 'start': 81.72, 'end': 81.88 }, { 'word': ' up', 'start': 81.88, 'end': 82.06 }, { 'word': ' hiking', 'start': 82.06, 'end': 82.24 }]

type DragRange = {
    start: number;
    end: number;
}

type FocusRange = {
    startIndex: number;
    endIndex: number;
}

export default function VideoPage() {
    const playerRef = useRef<YouTubePlayer | null>(null);
    const intervalId = useRef<NodeJS.Timeout | null>(null);
    const [currIndex, setCurrIndex] = useState(0);
    const [focusRange, setFocusRange] = useState<FocusRange | null>(null);
    const [dragRange, setDragRange] = useState<DragRange | null>(null);

    const onReady = (event: YouTubeEvent) => {
        playerRef.current = event.target;
    };


    const playFromSecond = async (seconds: number) => {
        if (playerRef.current) {
            await playerRef.current.seekTo(seconds, true);
            await playerRef.current.playVideo();
        }
    };

    return (
        <div>
            <YouTube videoId="UNP03fDSj1U"
                opts={{
                    height: '390',
                    width: '640',
                    playerVars: {
                        autoplay: 0
                    }
                }}
                onReady={onReady}
                onPlay={(e) => {
                    if (intervalId.current) {
                        clearInterval(intervalId.current)
                    }
                    intervalId.current = setInterval(async () => {
                        const currTime = await e.target.getCurrentTime()

                        let nextIndex = currIndex
                        while (nextIndex < Transcripts.length) {
                            const transcript = Transcripts[nextIndex]
                            if (transcript.end < currTime) {
                                nextIndex++;
                                continue
                            }
                            setCurrIndex(nextIndex)
                            break
                        }
                    }, 100)
                }}
                onPause={(e) => {
                    if (!intervalId.current) {
                        return
                    }
                    clearInterval(intervalId.current)
                }}
            />
            <div>
                {Transcripts.map((x, index) => {
                    let bgColor = ""
                    bgColor = index === currIndex
                        ? "lightblue"
                        : focusRange !== null && focusRange.startIndex <= index && index <= focusRange.endIndex
                            || dragRange !== null && dragRange.start <= index && index <= dragRange.end
                            ? "lightcoral"
                            : "";
                    return (
                        <button
                            className='pr-2'
                            style={{ backgroundColor: bgColor }}
                            onClick={async () => {
                                setCurrIndex(index)
                                await playFromSecond(x.start)
                            }}
                            onPointerDown={e => {
                                setFocusRange(null)
                                setDragRange({ start: index, end: index })
                            }}
                            onPointerUp={e => {
                                setDragRange(null)
                                if (dragRange === null) {
                                    return;
                                }
                                if (dragRange.start < index) {
                                    setFocusRange({ startIndex: dragRange.start, endIndex: index })
                                }
                            }}
                            onPointerMove={e => {
                                if (dragRange === null) {
                                    return;
                                }
                                if (dragRange.start < index) {
                                    setDragRange({
                                        ...dragRange,
                                        end: index
                                    })
                                }
                            }}
                        >
                            {x.word}
                        </button>
                    )
                })}
            </div>

            <div className=' mt-4'>
                <button
                    onClick={async e => {
                        if (focusRange === null) {
                            return;
                        }
                        const firstWord = Transcripts[focusRange.startIndex]
                        const endWord = Transcripts[focusRange.endIndex]
                        await playFromSecond(firstWord.start)

                        const id = setInterval(async () => {
                            const time = await playerRef.current?.getCurrentTime()
                            if (!time) {
                                return
                            }
                            if (endWord.end < time) {
                                await playerRef.current?.pauseVideo()
                                clearInterval(id)
                            }
                        }, 100)
                    }}
                >loop in range</button>
            </div>
        </div>
    );
}


