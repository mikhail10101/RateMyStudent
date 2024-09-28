import RateForm from "./rate-form"
import ProfileNavigation from "@/components/blocks/student/profile-navigation"
import UnderNav from "./under-nav"
import HomeFooter from "@/components/blocks/homepage/home-footer"

export default function Page() {
    return (
        <div>
            <ProfileNavigation />

            <div className="z-10 absolute">
                <UnderNav />
            </div>
            <div className="h-[8rem]"></div>

            <div className="flex flex-col items-center">
                <div className="w-[40rem] max-w-[80%] mt-4">
                    <RateForm />
                </div>
            </div>
            
            <HomeFooter />
        </div>
    )
}