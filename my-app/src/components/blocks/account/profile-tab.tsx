import { black_poppins } from "@/lib/fonts"

export default function ProfileTab({ username, email } : {
    username: string,
    email: string
}) {
    return (
        <div className="flex flex-col gap-8 p-5">
            <div className="flex flex-col">
                <p className={`${black_poppins.className} text-xs`}>Username</p>
                <p>{username}</p>
            </div>
            <div className="flex flex-col">
                <p className={`${black_poppins.className} text-xs`}>Email</p>
                <p>{email}</p>
            </div>
        </div>
    )
}