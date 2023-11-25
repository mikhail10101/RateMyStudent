import { fetchRatingIdsById } from "@/lib/data"
import CommentCard from "./comment-card"

export default async function CommentSection({id}: {id: string}) {
    const ratingIds = await fetchRatingIdsById(id)
    return (
        <div className="flex flex-col gap-10 max-w-[80%] w-[60rem]">
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