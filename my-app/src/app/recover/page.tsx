import RecoverForm from "./recover-form"
import BackHome from "@/components/blocks/homepage/back-to-home"

export default function Page() {
    return (
        <>
            <BackHome />
            <div className="flex w-full h-screen justify-center items-center">
                <RecoverForm />
            </div>
        </>
    )
}