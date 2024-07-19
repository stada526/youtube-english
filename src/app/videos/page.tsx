"use client";
import { videoClient } from '@/http-clients/video-client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

type VideoListItem = {
    id: string,
    title: string,
    createdAt: Date
}

export default function VideoListPage() {
    const [videoList, setVideList] = useState<VideoListItem[]>([])

    useEffect(() => {
        const f = async () => {
            const res = await videoClient.getVideoList()
            setVideList(res.map(x => ({ id: x.id, title: x.title, createdAt: new Date(x.createdAt)})))
        }
        f();
    }, [])

    if (videoList.length === 0) {
        return <div>Loading...</div>
    }

    return (
        <div className='h-screen'>
            <h1 className='text-xl'>English Learning with Youtube</h1>
            <ul>
                {videoList.map(x => (
                    <li key={x.id}>
                        <Link href={`/video/?videoId=${x.id}`}>
                            {x.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

