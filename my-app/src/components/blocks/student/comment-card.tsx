import { fetchRatingById } from "@/lib/data"

export default async function CommentCard({ratingId}: {ratingId: string}) {
    const { id, student_id, commenter_id, rating, noise, grade, classroom, attendance, likes, dislikes, comment } = await fetchRatingById(ratingId)
    return (
        <div>
            
        </div>
    )
}