'use client';

import clsx from "clsx"
import Image from "next/image"
import { black_poppins, nanum } from "@/lib/fonts"
import { Rating } from "@/lib/definitions"

export default function CommentCard({rat}: {rat: Rating}) {
    const { id, student_id, commenter_id, rating, noise, grade, classroom, attendance, likes, dislikes, comment, date } = rat
    return (
        <div className="relative flex sm:flex-row max-sm:flex-col bg-zinc-100 p-10 gap-10"> 
                <div className="flex sm:flex-col max-sm:flex-row max-sm:mt-5 gap-6">
                    <div className="flex flex-col items-center">
                        <p className={`text-sm font-bold`}>QUALITY</p>
                        <div className={clsx({
                            ["w-[5rem] h-[4rem] text-3xl flex items-center justify-center"]: true,
                            ["bg-sky-200"]: 0 <= rating && rating < 3,
                            ["bg-blue-500"]: 3 <= rating && rating < 4.5,
                            ["bg-rose-200"]: 4.5 <= rating && rating < 6,
                            ["bg-orange-200"]: 6 <= rating && rating < 7,
                            ["bg-yellow-200"]: 7 <= rating && rating < 9,
                            ["bg-white"]: 9 <= rating && rating < 10,
                            ["bg-green-200"]: 10 == rating
                        })}>
                            <p className={`${black_poppins.className}`}>{rating}</p>
                        </div>
                    </div>
                    <div className="flex flex-col items-center">
                        <p className={`text-sm font-bold`}>NOISE</p>
                        <div className={clsx({
                            ["w-[5rem] h-[4rem] text-3xl flex items-center justify-center"]: true,
                            ["bg-slate-300"]: 0 <= noise && noise < 1,
                            ["bg-green-100"]: 1 <= noise && noise < 2,
                            ["bg-green-200"]: 2 <= noise && noise < 3,
                            ["bg-green-300"]: 3 <= noise && noise < 4,
                            ["bg-green-400"]: 4 <= noise && noise < 5,
                            ["bg-green-500"]: noise == 5,
                        })}>
                            <p className={`${black_poppins.className}`}>{noise}</p>
                        </div>
                    </div>
            </div>  

            <div className="flex flex-col gap-7">
                <div>
                    <p className={`${black_poppins.className} text-2xl`}>{classroom}</p>
                    <div className="flex flex-row text-xs gap-6">
                        <p>Attendance: {attendance}%</p>
                        <p>Grade: {grade}</p>
                    </div>
                </div>
                <p className="font-medium text-sm min-h-[4rem]">{comment}</p>
                <div className="flex flex-row gap-5">
                    <div className="flex flex-row items-center gap-1">
                        <Image
                            src="/thumbs-up.svg"
                            width={20}
                            height={20}
                            alt="thumbs up"
                        />
                        <p>{likes}</p>
                    </div>
                    <div className="flex flex-row items-center gap-1">
                        <Image
                            src="/thumbs-down.svg"
                            width={20}
                            height={20}
                            alt="thumbs down"
                        />
                        <p>{dislikes}</p>
                    </div>
                </div>

                <div className="absolute top-4 right-8">
                    <p className="font-bold text-sm">{date.toDateString().substring(4)}</p>
                </div>

            </div>
        </div>
    )
}