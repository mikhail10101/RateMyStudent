'use client';

import Like from "./like"
import Dislike from "./dislikes"

export default function LikePanel({ likes, dislikes, likeValue, rating_id }: {
    likes: number,
    dislikes: number,
    likeValue: number
    rating_id: string
}) {
    
    console.log(likeValue)
    var liked = false
    var disliked = false
    if (likeValue == 1) {
        liked = true
    }
    if (likeValue == -1) {
        disliked = true
    }

    return (
        <div className="flex flex-row gap-5">
            <div className="w-10">
                <Like amount={likes} solid={liked} rating_id={rating_id} />
            </div>
            <div className="w-10">
                <Dislike amount={dislikes} solid={disliked} rating_id={rating_id} />
            </div>
        </div>
    )

}