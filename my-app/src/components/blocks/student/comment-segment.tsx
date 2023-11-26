import { fetchRatingIdsById } from "@/lib/data"
import CommentCard from "./comment-card"

export default async function CommentSegment({id, page_offset}: {id: string, page_offset: number}) {
    const ratingIds = await fetchRatingIdsById(id, page_offset)
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