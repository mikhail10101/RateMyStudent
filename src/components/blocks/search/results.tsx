import { fetchFilteredStudents, fetchFilteredStudentsCount } from "@/lib/data"
import StudentCard from "./student-card"

export default async function Results({query, currentPage}:{
    query: string
    currentPage: number
}) {
    const students = await fetchFilteredStudents(query, currentPage)
    const amountStudents = await fetchFilteredStudentsCount(query)
    return (
        <div className="space-y-8">
            <p className="text-2xl font-medium">Found {amountStudents} results</p>
            {students.map((student) => {
                return (
                    <StudentCard
                        id={student.id.toString()}
                        key={student.id.toString()}
                        firstname={student.firstname}
                        lastname={student.lastname}
                        school={student.school}
                        rating={student.rating}
                        amount={student.amount}
                        major={student.major}
                        noise={student.noise}
                    />
                )
            })}
        </div>
    )
}