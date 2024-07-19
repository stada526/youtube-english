import { ReactNode } from "react"
import { IoPlayBackSharp, IoPlayForwardSharp } from "react-icons/io5"

type PlayerControllerProps = {
    playbackRate: number
    onFastForward: () => void
    onFastBackward: () => void
}

export const PlayerController = (props: PlayerControllerProps) => {
    return (
        <div className='flex border border-solid border-gray-400 w-fit'>
            <IconButton onClick={props.onFastBackward}>
                <IoPlayBackSharp />
            </IconButton>
            <span className='text-center w-10 text-sm py-1 border-x border-solid border-gray-400'>
                {props.playbackRate}
            </span>
            <IconButton onClick={props.onFastForward}>
                <IoPlayForwardSharp />
            </IconButton>
        </div>
    )
}

type IconButtonProps = {
    children: ReactNode
    onClick: () => void
}

const IconButton = (props: IconButtonProps) => {
    return (
        <button
            onClick={props.onClick}
            className='px-2'
        >
            {props.children}
        </button>
    )
}