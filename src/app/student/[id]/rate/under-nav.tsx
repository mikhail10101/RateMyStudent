import { fetchStudentById } from "@/lib/data"
import { black_poppins } from "@/lib/fonts"

import { headers } from 'next/headers'

import { auth } from "../../../../auth";

export default async function UnderNav() {
    const headersList = headers();
    const domain = headersList.get('host') || "";
    const fullUrl = headersList.get('referer') || "";

    const student_id = fullUrl.split("/")[4]

    const { firstname, lastname, major, school } = await fetchStudentById(student_id)
    return (
        <>
            <div className="flex flex-col items-center justify-center fixed top-16 w-full left-0 h-[8rem] shadow-xl bg-white">
                <div className="w-[46rem]">
                    <div className="flex flex-row text-3xl gap-2 ">
                        <p>Rate:</p>
                        <p className={`${black_poppins.className}`}>{firstname}{" "}{lastname}</p>
                    </div>
                    <div className="flex flex-row text-sm gap-1">
                        <p>{major}</p>
                        <p>|</p>
                        <p>{school}</p>
                    </div>
                </div>
            </div>
        </>
    )

}