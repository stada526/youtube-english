import { apiUrl } from "./api-url"

type VideoListItemContract = {
    id: string
    youtubeVideoId: string
    title: string
    createdAt: string
}

type WordContract = {
    word: string
    start: number
    end: number
}


type SegmentContract = {
    start: number
    end: number
    text: string
    words: WordContract[]
}


type VideoItemContract = {
    id: string
    youtubeVideoId: string
    title: string
    caption: SegmentContract[]
}

const getVideoList = async(): Promise<VideoListItemContract[]> => {
    const url = new URL(apiUrl("videos/"))

    const res = await fetch(url)
    return await res.json() as VideoListItemContract[]
}

const getVideo = async(id: string): Promise<VideoItemContract> => {
    const url = new URL(apiUrl(`videos/${id}`))

    const res = await fetch(url)
    return await res.json() as VideoItemContract
}

export const videoClient = {
    getVideoList,
    getVideo
}