'use client';

import Like from "./like"
import Dislike from "./dislikes"

export default function LikePanel({likes, dislikes, liked, disliked, rating_id}:{
    likes: number,
    dislikes: number,
    liked: boolean,
    disliked: boolean,
    rating_id: string
}) {
    return (<div className="flex flex-row gap-5">
        <div className="w-10">
            <Like amount={likes} solid={liked} rating_id={rating_id}/>
        </div>
        <div className="w-10">
            <Dislike amount={dislikes} solid={disliked} rating_id={rating_id} />
        </div>
    </div>)
}