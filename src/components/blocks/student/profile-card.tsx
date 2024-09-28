import { fetchStudentById } from "@/lib/data"
import { black_poppins, nanum } from "@/lib/fonts"
import Image from "next/image"
import SoundBar from "@/components/blocks/search/soundbar"

import Link from "next/link"

export default async function ProfileCard ({id}: {id: string}) {
    const student = await fetchStudentById(id)
    const { firstname, lastname, birthday, email, school, major, rating, amount, noise} = student
    return (
        <div className="mt-20 space-y-5 flex flex-col max-w-[80%] w-[60rem]">
                <div>
                    <div className="flex flex-row space-x-6 h-[3.75rem]">
                        <SoundBar noise={noise}/>
                        <div className="flex flex-row -translate-y-1 space-x-3">
                            <p className={`${black_poppins.className} text-6xl`}>{rating}</p>
                            <div className="flex flex-row space-x-1 text-gray-500">
                                <p className="mt-1 text-xl">{"/"}</p>
                                <p className="mt-1 font-bold text-xl">10</p>
                            </div>
                        </div>
                    </div>
                    <p className="text-sm font-bold">Overall quality based on {amount} ratings</p>
                </div>

                <div>
                    <p className={`${black_poppins.className} text-5xl mb-1`}>{firstname} {lastname}</p>
                    <p className="text-sm">Student in the <b><u>{major}</u></b> department</p>
                    <p className="text-sm">at the <b><u>{school}</u></b></p>
                    <br/>
                    <div className="flex flex-row space-x-2 items-center">
                        <Image
                            src="/envelope-solid.svg"
                            width={25}
                            height={25}
                            alt="contact"
                        />
                        <p className={`${nanum.className}`}>{email}</p>
                    </div>
                    <div className="flex flex-row space-x-2 items-center">
                        <Image
                            src="/calendar-solid.svg"
                            width={25}
                            height={25}
                            alt="birthday"
                        />
                        <p className={`${nanum.className}`}>{birthday.toDateString().substring(3)}</p>
                    </div>
                </div>
            </div>
    )
}