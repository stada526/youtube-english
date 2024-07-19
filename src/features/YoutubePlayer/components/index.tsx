import { forwardRef, useRef } from "react";
import YouTube, { YouTubeEvent, YouTubePlayer } from "react-youtube";

export type IntervalFn = (currentTime: number) => void

type Props = {
    videoId: string
    onInterval: IntervalFn
}

export const Youtube = forwardRef<YouTubePlayer, Props>(function YoutubePlayer (props, ref) {
    const intervalId = useRef<NodeJS.Timeout | null>(null);

    const onReady = (event: YouTubeEvent) => {
        if (ref && typeof ref !== 'function') {
            ref.current = event.target;
        }
    };

    return (
        <YouTube videoId={props.videoId}
            opts={{
                height: '500px',
                width: '100%',
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
                    // console.log(currTime)
                    props.onInterval(currTime)
                }, 50)
            }}
            onPause={(e) => {
                if (!intervalId.current) {
                    return
                }
                clearInterval(intervalId.current)
            }}
        />
    )
})

