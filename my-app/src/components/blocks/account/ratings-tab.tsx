import { fetchRatingIdsByCommenterId, fetchRatingById } from "@/lib/data"
import { auth } from "../../../auth"
import { fetchUserByEmail } from "@/lib/data"
import CommentCard from "../student/comment-card"
import RatingSegment from "./ratings-segment"
import { black_poppins } from "@/lib/fonts"

export default async function RatingsTab() {
    const sessions = await auth()
    const email = sessions?.user?.email || ""

    const { id } = await fetchUserByEmail(email)

    const ratingIds = await fetchRatingIdsByCommenterId(id)
    const ratings = await Promise.all(ratingIds.map(async (ratingId) => {
        return await fetchRatingById(ratingId.id)
    }))

    return (
        <>
        <div className={`flex flex-col items-center text-3xl mb-10 ${black_poppins.className}`}>
            Submitted Ratings
        </div>
        <div className="flex flex-col gap-12">
            <RatingSegment ratings={ratings} />
        </div>
        </>
    )
}