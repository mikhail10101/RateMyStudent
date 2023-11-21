import { Student } from "@/lib/definitions"
import clsx from "clsx"
import { black_poppins } from "@/lib/fonts"

type CardProps = {
    firstname: string,
    lastname: string,
    school: string,
    rating: number,
    amount: number
}

export default function StudentCard({ firstname, lastname, school, rating, amount }: CardProps) {
    return (
        <div className="flex flex-row">
            <div className="flex flex-col items-center">
                <p>QUALITY</p>
                <div className={clsx({
                    ["w-[3rem] h-[3rem] text-3xl"]: true,
                    ["bg-sky-300"]: 0 <= rating && rating < 3,
                    ["bg-blue-700"]: 3 <= rating && rating < 4.5,
                    ["bg-rose-700"]: 4.5 <= rating && rating < 6,
                    ["bg-orange-600"]: 6 <= rating && rating < 7,
                    ["bg-yellow-300"]: 7 <= rating && rating < 9,
                    ["bg-white"]: 9 <= rating && rating <= 10,
                })}>
                    <p>{rating}</p>
                </div>
                <p>{amount} ratings</p>
            </div>
            <div>
                <p className={`${black_poppins.className}`}>{firstname} {lastname}</p>
                <p>{school}</p>
            </div>
        </div>
    )
}