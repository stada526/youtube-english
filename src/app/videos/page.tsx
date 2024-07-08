"use client";
import { Caption } from '@/features/Caption/components/Caption';
import { useCaption } from '@/features/Caption/hooks';
import { sample } from '@/features/Caption/sample';
import { useYoutubePlayer } from '@/features/YoutubePlayer/hooks';
import React, { useState } from 'react';
import { IoPlayBackSharp, IoPlayForwardSharp } from 'react-icons/io5';


export default function VideoPage() {
    const [segments, setSegments] = useState(sample)
    const { segmentIndex, wordIndex, focusWordAtSeconds, focusWordAtIndices } = useCaption(segments)

    const YoutubePlayer = useYoutubePlayer(
        "UNP03fDSj1U",
        (currentTime) => focusWordAtSeconds(currentTime)
    )

    return (
        <div className='h-screen'>
            <div className='h-full flex flex-col max-w-[820px] mx-auto'>
                <div>
                    {YoutubePlayer.component()}
                </div>
                <div>
                    <button onClick={() => YoutubePlayer.setPlaybackRateBy(-0.25)}>
                        <IoPlayBackSharp />
                    </button>
                    <span>{YoutubePlayer.playbackRate}</span>
                    <button onClick={() => YoutubePlayer.setPlaybackRateBy(0.25)}>
                        <IoPlayForwardSharp />
                    </button>
                </div>
                <div className='flex-1 min-h-0'>
                    <Caption
                        segments={segments}
                        segmentIndex={segmentIndex}
                        wordIndex={wordIndex}
                        onClickWord={(segmentIndex, wordIndex) => {
                            focusWordAtIndices(segmentIndex, wordIndex)
                            YoutubePlayer.play(segments[segmentIndex].words[wordIndex].start)
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

