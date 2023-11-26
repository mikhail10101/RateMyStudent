import ProfileNavigation from "@/components/blocks/student/profile-navigation"
import ProfileCard from "@/components/blocks/student/profile-card"
import CommentSection from "@/components/blocks/student/comment-section"
import HomeFooter from "@/components/blocks/homepage/home-footer"

export default function Page({ params }: { params: { id: string }}) {
    const id = params.id

    return (
        <>
            < ProfileNavigation />
            <div className="flex flex-col items-center min-h-screen mt-16">
                < ProfileCard id={id} />
                < CommentSection id={id} />
            </div>
            < HomeFooter />
        </>
    )
}