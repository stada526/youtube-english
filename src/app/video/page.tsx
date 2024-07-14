"use client";
import { Caption } from '@/features/Caption/components/Caption';
import { Segment } from '@/features/Caption/domain';
import { useCaption } from '@/features/Caption/hooks';
import { sample } from '@/features/Caption/sample';
import { useYoutubePlayer } from '@/features/YoutubePlayer/hooks';
import { videoClient } from '@/http-clients/video-client';
import { useSearchParams } from 'next/navigation';
import React, { Suspense, useEffect, useState } from 'react';
import { IoPlayBackSharp, IoPlayForwardSharp } from 'react-icons/io5';

type Video = {
    id: string
    youtubeVideoId: string
    title: string
    caption: Segment[]
}

export default function VideoPage() {

    return (
        <div className='h-screen'>
            <Suspense>
                <Main />
            </Suspense>
        </div>
    );
}

const Main= () => {
    const [video, setVideo] = useState<Video | null>(null)
    const searchParams = useSearchParams()
    const videoId = searchParams.get("videoId") // UNP03fDSj1U

    useEffect(() => {
        if (videoId === null) {
            return
        }
        const f = async() => {
            const res = await videoClient.getVideo(videoId)
            setVideo(res)
        }
        f()
    }, [videoId])

    if (videoId === null || video === null) {
        return <div>Loading...</div>
    }

    return (
        <VideoWithCaption video={video} />
    )
}

type VideoWithCaptionProps = {
    video: Video
}

const VideoWithCaption = (props: VideoWithCaptionProps) => {
    const { segmentIndex, wordIndex, focusWordAtSeconds, focusWordAtIndices } = useCaption(props.video.caption)

    const YoutubePlayer = useYoutubePlayer(
        props.video.youtubeVideoId,
        (currentTime) => focusWordAtSeconds(currentTime)
    )

    return (
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
                segments={props.video.caption}
                segmentIndex={segmentIndex}
                wordIndex={wordIndex}
                onClickWord={(segmentIndex, wordIndex) => {
                    focusWordAtIndices(segmentIndex, wordIndex)
                    YoutubePlayer.play(props.video.caption[segmentIndex].words[wordIndex].start)
                }}
            />
        </div>
    </div>
    )
}
