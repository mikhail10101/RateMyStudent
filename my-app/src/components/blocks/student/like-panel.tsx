'use client';

import { useState } from "react";

import Image from "next/image"
import { Vote } from "@/lib/actions"

export default function LikePanel({ likes, dislikes, likeValue, rating_id }: {
    likes: number,
    dislikes: number,
    likeValue: number
    rating_id: string
}) {

    const [liked, setLiked] = useState(likeValue == 1)
    const [disliked, setDisliked] = useState(likeValue == -1)
    const [numlikes, setNumlikes] = useState(likes)
    const [numdislikes, setNumdislikes] = useState(dislikes)

    const handleLike = () => {
        if (liked) {
            setNumlikes(numlikes-1)
        } else {
            setNumlikes(numlikes+1)
        }
        Vote(rating_id,1)
        setLiked(!liked)
        if (disliked) {
            setNumdislikes(numdislikes-1)
        }
        setDisliked(false)
    }

    const handleDislike = () => {
        if (disliked) {
            setNumdislikes(numdislikes-1)
        } else {
            setNumdislikes(numdislikes+1)
        }
        Vote(rating_id,0)
        setDisliked(!disliked)
        if (liked) {
            setNumlikes(numlikes-1)
        }
        setLiked(false)
    }

    if (liked) {
        return (
            <div className="flex flex-row gap-5">
                <div className="w-10">

                    <div className="flex flex-row items-center gap-1">
                        <button onClick={handleLike}>
                            <Image
                                src="/thumbs-up-solid.svg"
                                width={20}
                                height={20}
                                alt="thumbs up"
                            />
                        </button>
                        <p>{numlikes}</p>
                    </div>

                </div>
                <div className="w-10">

                    <div className="flex flex-row items-center gap-1">
                        <button onClick={handleDislike}>
                            <Image
                                src="/thumbs-down.svg"
                                width={20}
                                height={20}
                                alt="thumbs down"
                            />
                        </button>
                        <p>{numdislikes}</p>
                    </div>
                    
                </div>
            </div>
        )
    } else if (disliked) {
        return (
            <div className="flex flex-row gap-5">
                <div className="w-10">

                    <div className="flex flex-row items-center gap-1">
                        <button onClick={handleLike}>
                            <Image
                                src="/thumbs-up.svg"
                                width={20}
                                height={20}
                                alt="thumbs up"
                            />
                        </button>
                        <p>{numlikes}</p>
                    </div>

                </div>
                <div className="w-10">

                    <div className="flex flex-row items-center gap-1">
                        <button onClick={handleDislike}>
                            <Image
                                src="/thumbs-down-solid.svg"
                                width={20}
                                height={20}
                                alt="thumbs down"
                            />
                        </button>
                        <p>{numdislikes}</p>
                    </div>
                    
                </div>
            </div>
        )
    } else {

        return (
            <div className="flex flex-row gap-5">
                <div className="w-10">

                    <div className="flex flex-row items-center gap-1">
                        <button onClick={handleLike}>
                            <Image
                                src="/thumbs-up.svg"
                                width={20}
                                height={20}
                                alt="thumbs up"
                            />
                        </button>
                        <p>{numlikes}</p>
                    </div>

                </div>
                <div className="w-10">

                    <div className="flex flex-row items-center gap-1">
                        <button onClick={handleDislike}>
                            <Image
                                src="/thumbs-down.svg"
                                width={20}
                                height={20}
                                alt="thumbs down"
                            />
                        </button>
                        <p>{numdislikes}</p>
                    </div>
                    
                </div>
            </div>
        )
    }
}