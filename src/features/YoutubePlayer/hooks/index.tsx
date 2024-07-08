import { useCallback, useMemo, useRef, useState } from "react";
import { YouTubePlayer } from "react-youtube"
import { Youtube } from "../components";

type IntervalFn = (currentTime: number) => void

type UseYoutubePlayer = {
    component: () => JSX.Element
    playbackRate: number
    play: (seconds: number) => Promise<void>
    pause: () => Promise<void>
    setPlaybackRateBy: (diff: number) => Promise<void>
}


export const useYoutubePlayer = (videoId: string, intervalFn: IntervalFn): UseYoutubePlayer => {
    const playerRef = useRef<YouTubePlayer | null>(null);
    const [playbackRate, setPlaybackRate] = useState(1);

    const play = useCallback(async (seconds: number) => {
        if (playerRef.current) {
            await playerRef.current.seekTo(seconds, true);
            await playerRef.current.playVideo();
        }
    }, []);

    const pause = useCallback(async () => {
        if (playerRef.current) {
            await playerRef.current.pauseVideo();
        }
    }, [])

    const setPlaybackRateBy = useCallback(async(diff: number) => {
        if (playerRef.current) {
            const rate = await playerRef.current.getPlaybackRate() + diff;
            await playerRef.current.setPlaybackRate(rate);
            setPlaybackRate(rate)
        }
    }, [])

    const youtubePlayer = () => (
        <Youtube
            videoId={videoId}
            onInterval={intervalFn}
            ref={playerRef}
        />
    )

    return {
        component: youtubePlayer,
        playbackRate,
        play,
        pause,
        setPlaybackRateBy
    }
}