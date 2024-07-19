"use client";
import { videoClient } from '@/http-clients/video-client';
import React, { useEffect, useState } from 'react';
import { VideoItem } from './_components/VideoItem';

type VideoListItem = {
    id: string
    title: string
    youtubeVideoId: string
    createdAt: Date
}

export default function VideoListPage() {
    const [videoList, setVideList] = useState<VideoListItem[]>([])

    useEffect(() => {
        const f = async () => {
            const res = await videoClient.getVideoList()
            setVideList(res.map(x => ({ id: x.id, title: x.title, youtubeVideoId: x.youtubeVideoId, createdAt: new Date(x.createdAt)})))
        }
        f();
    }, [])

    return (
        <div className='h-screen'>
            <h1 className='text-xl text-center py-10'>English Learning with Youtube</h1>
            <div className='flex justify-center mt-10'>
                {videoList.length === 0 ? (
                    <div>Loading....</div>
                ) : (
                    <ul className='flex flex-col space-y-6'>
                        {videoList.map(x => (
                            <li key={x.id}>
                                <VideoItem
                                    id={x.id}
                                    title={x.title}
                                    youtubeVideoId={x.youtubeVideoId}
                                />
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

