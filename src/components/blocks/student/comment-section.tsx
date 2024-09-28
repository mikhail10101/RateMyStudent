import { fetchRatingIdsById, fetchRatingById, fetchVoteByRatingId } from "@/lib/data"
import CommentSegment from "./comment-segment"
import clsx from "clsx"

export default async function CommentSection({id}:{id: string}) {
    const ratingIds = await fetchRatingIdsById(id)
    const ratings = await Promise.all(ratingIds.map(async (ratingId) => {
        return await fetchRatingById(ratingId.id)
    }))

    return (
        <div className="flex flex-col max-w-[80%] w-[60rem]">
            <div className={clsx({"hidden": ratings.length != 0},{"text-3xl font-bold my-20": true})}>
                <p>It's looking pretty empty here.</p>
                <p>Don't be afraid, drop a comment below!</p>
            </div>
            < CommentSegment ratings={ratings} />
        </div>
    )
}