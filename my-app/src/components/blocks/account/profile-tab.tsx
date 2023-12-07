import { black_poppins } from "@/lib/fonts"
import { auth } from "../../../../auth"
import { fetchUserByEmail } from "@/lib/data"

export default async function ProfileTab() {

    const session = await auth()
    const { username, email } = await fetchUserByEmail(session?.user?.email || "")

    return (
        <>
            <div className={`flex flex-col items-center text-3xl mb-10 ${black_poppins.className}`}>
                Details
            </div>
            <div className="flex flex-col gap-8">
                <div className="flex flex-col">
                    <p className={`${black_poppins.className} text-xs`}>Username</p>
                    <p>{username}</p>
                </div>
                <div className="flex flex-col">
                    <p className={`${black_poppins.className} text-xs`}>Email</p>
                    <p>{email}</p>
                </div>
            </div>
        </>
    )
}