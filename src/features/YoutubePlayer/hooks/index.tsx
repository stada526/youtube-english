import { useRef } from "react";
import { YouTubePlayer } from "react-youtube"
import { Youtube } from "../components";

type IntervalFn = (currentTime: number) => void

type UseYoutubePlayer = {
    YoutubePlayer: () => JSX.Element
    play: (seconds: number) => Promise<void>
}


export const useYoutubePlayer = (videoId: string, intervalFn: IntervalFn): UseYoutubePlayer => {
    const playerRef = useRef<YouTubePlayer | null>(null);

    const play = async (seconds: number) => {
        if (playerRef.current) {
            await playerRef.current.seekTo(seconds, true);
            await playerRef.current.playVideo();
        }
    };

    const youtubePlayer = () => (
        <Youtube
            videoId={videoId}
            onInterval={intervalFn}
            ref={playerRef}
        />
    )

    return {
        YoutubePlayer: youtubePlayer,
        play
    }
}