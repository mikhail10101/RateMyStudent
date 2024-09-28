import { Student } from "@/lib/definitions"
import clsx from "clsx"
import { black_poppins, nanum } from "@/lib/fonts"
import SoundBar from "./soundbar"
import Link from "next/link"

type CardProps = {
    id: string,
    firstname: string,
    lastname: string,
    school: string,
    major: string,
    rating: number,
    amount: number,
    noise: number
}

export default function StudentCard({ id, firstname, lastname, school, major, rating, amount, noise }: CardProps) {
    return (
        <Link href={`/student/${id}`} className="flex flex-row items-center gap-2 p-4 bg-zinc-100 h-36">
            <div className="flex flex-col items-center m-4 space-y-1">
                <p className={`text-xs font-bold`}>QUALITY</p>
                <div className={clsx({
                    ["w-[5rem] h-[4rem] text-3xl flex items-center justify-center"]: true,
                    ["bg-sky-200"]: 0 <= rating && rating < 3,
                    ["bg-blue-500"]: 3 <= rating && rating < 4.5,
                    ["bg-rose-200"]: 4.5 <= rating && rating < 6,
                    ["bg-orange-200"]: 6 <= rating && rating < 7,
                    ["bg-yellow-200"]: 7 <= rating && rating < 9,
                    ["bg-white"]: 9 <= rating && rating <= 10,
                })}>
                    <p className={`${black_poppins.className}`}>{rating}</p>
                </div>
            <p className="text-xs">{amount} ratings</p>
            </div>
            <div className="space-y-2 mr-auto">
            <div>
                <p className={`${black_poppins.className} text-lg`}>{firstname} {lastname}</p>
                <p className="text-xs">{major}</p>
            </div>
            <p>{school}</p>
            </div>
            <div className="flex flex-col w-8 space-y-1 mr-5 mt-3 items-center">
                <SoundBar noise={noise}/>
                <p className="text-xs font-bold">Noise</p>
            </div>
        </Link>
    )
}