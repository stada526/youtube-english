import Link from "next/link"
import Image from 'next/image';

type Props = {
    id: string
    title: string
    youtubeVideoId: string
}

export const VideoItem = (props: Props) => {
    return (
        <Link href={`/video/?videoId=${props.id}`} className='block'>
            <div className='w-[300px]'>
                <Image
                    width={320}
                    height={180}
                    src={`https://img.youtube.com/vi/${props.youtubeVideoId}/mqdefault.jpg`}
                    alt={`Video sumbnail of ${props.title}`}
                />
                <p className='text-base'>
                    {props.title}
                </p>
            </div>
        </Link>
    )
}
