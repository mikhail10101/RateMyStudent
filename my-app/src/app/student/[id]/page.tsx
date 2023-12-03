import ProfileNavigation from "@/components/blocks/student/profile-navigation"
import ProfileCard from "@/components/blocks/student/profile-card"
import CommentSection from "@/components/blocks/student/comment-section"
import HomeFooter from "@/components/blocks/homepage/home-footer"
import LinkRate from "@/components/blocks/student/link-rate"

export default function Page({ params }: { params: { id: string }}) {
    const id = params.id

    return (
        <>
            < ProfileNavigation />
            <div className="flex flex-col items-center min-h-screen mt-16">
                <div className="flex flex-col items-start max-w-[80%]">
                    < ProfileCard id={id} />
                    < LinkRate />
                </div>
                < CommentSection id={id} />
            </div>
            < HomeFooter />
        </>
    )
}