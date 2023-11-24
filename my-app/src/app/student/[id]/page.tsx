import ProfileNavigation from "@/components/blocks/student/profile-navigation"
import ProfileCard from "@/components/blocks/student/profile-card"
import CommentSection from "@/components/blocks/student/comment-section"

export default function Page({ params }: { params: { id: string }}) {
    const id = params.id
    return (
        <div className="flex flex-col items-center">
            < ProfileNavigation />
            < ProfileCard id={id} />
            < CommentSection id={id} />
        </div>
    )
}