import { useCallback, useRef } from "react";
import { YouTubePlayer } from "react-youtube"
import { Youtube } from "../components";

type IntervalFn = (currentTime: number) => void

type UseYoutubePlayer = {
    component: () => JSX.Element
    play: (seconds: number) => Promise<void>
    pause: () => Promise<void>
}


export const useYoutubePlayer = (videoId: string, intervalFn: IntervalFn): UseYoutubePlayer => {
    const playerRef = useRef<YouTubePlayer | null>(null);

    const play = useCallback(async (seconds: number) => {
        if (playerRef.current) {
            await playerRef.current.seekTo(seconds, true);
            await playerRef.current.playVideo();
        }
    }, []);

    const pause = useCallback(async () => {
        if (playerRef.current) {
            await playerRef.current.pauseVideo
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
        play,
        pause
    }
}