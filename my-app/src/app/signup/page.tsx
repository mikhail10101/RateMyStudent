import BackHome from "@/components/blocks/homepage/back-to-home"
import SignupForm from "./signup-form"

export default function Page() {
    return (
        <>
            <BackHome />
            <div className="flex w-full h-screen justify-center items-center">
                <SignupForm />
            </div>
        </>
        
    )
}