import EditRatingForm from "./edit-rating-form"
import ProfileNavigation from "@/components/blocks/student/profile-navigation"
import EditUnderNav from "./edit-under-nav"
import HomeFooter from "@/components/blocks/homepage/home-footer"
import { fetchRatingById, fetchUserByRatingId } from "@/lib/data"

import { auth } from "../../../../../auth"

export default async function Page({ params }: { params: { id: string }}) {
    const rating = await fetchRatingById(params.id)

    const session = await auth()

    const { email } = await fetchUserByRatingId(params.id)

    if (session?.user?.email === email)
        return (
            <div>
                <ProfileNavigation />

                <div className="z-10 absolute">
                    <EditUnderNav rating_id={params.id}/>
                </div>
                <div className="h-[8rem]" />

                <div className="flex flex-col items-center">
                    <div className="w-[40rem] max-w-[80%] mt-4">
                        <EditRatingForm rating={rating}/>
                    </div>
                </div>
                
                <HomeFooter />
            </div>
        )
    return (
        <div>
            <p>Sorry! You can't edit this rating.</p>
        </div>
    )
}