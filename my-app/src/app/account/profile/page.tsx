import ProfileTab from "@/components/blocks/account/profile-tab"
import SignOut from "@/components/blocks/account/sign-out";

export default async function Page() {
    return (
        <>
            <ProfileTab />
            <div className="mt-20">
                <SignOut />
            </div>
            
        </>
    )
}