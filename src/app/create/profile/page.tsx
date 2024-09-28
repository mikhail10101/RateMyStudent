import ProfileForm from "./profile-form"
import HomeNav from "@/components/blocks/homepage/home-navigation"
import { black_poppins } from "@/lib/fonts"
import HomeFooter from "@/components/blocks/homepage/home-footer"
import Image from "next/image"

export default function Page() {
    return (
        <div>
            < HomeNav />

            <div className="bg-[url('/topview_desk.jpg')] bg-center bg-cover flex flex-col items-center py-32 shadow-inner shadow-xl">
                <div className="w-[40rem] max-w-[80%] mt-4">
                    <p className={`${black_poppins.className} text-white text-5xl`}>Create a student profile!</p>
                    < ProfileForm />
                </div>
            </div>

            <div className="flex flex-col text-center items-center justify-center">
                <Image
                    src="/logo_transparent.png"
                    alt="logo"
                    height={500}
                    width={500}
                />
                <p className={`${black_poppins.className} min-[670px]:text-6xl text-4xl`}>Join the RMS Family</p>

                <p className="text-xl">Love RMS? Let's make it official.</p>
            </div>

            <HomeFooter />
        </div>
    )
}