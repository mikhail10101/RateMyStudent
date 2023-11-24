import { fetchRatingIdsById } from "@/lib/data"
import CommentCard from "./comment-card"

export default async function CommentSection({id}: {id: string}) {
    const ratingIds = await fetchRatingIdsById(id)
    console.log(ratingIds)
    return (
        <div>
            {
                ratingIds.map((ratingId) => {
                    return (
                        <div key={ratingId.id}>
                            <CommentCard ratingId={ratingId.id}/>
                        </div>
                    )
                })
            }
        </div>
    )
}