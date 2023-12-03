import { fetchStudentByRatingId } from "@/lib/data"
import { black_poppins } from "@/lib/fonts"


export default async function EditUnderNav({ rating_id } :{ rating_id: string }) {
    const student = await fetchStudentByRatingId(rating_id)
    console.log(student)

    const { firstname, lastname, major, school } = student
    return (
        <>
            <div className="flex flex-col items-center justify-center fixed top-16 w-full left-0 h-[8rem] shadow-xl bg-white">
                <div className="w-[46rem]">
                    <div className="flex flex-row text-3xl gap-2 ">
                        <p>Edit Rating:</p>
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