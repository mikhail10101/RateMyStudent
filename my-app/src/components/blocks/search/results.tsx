import { fetchFilteredInvoices } from "@/lib/data"
import StudentCard from "./student-card"

export default async function Results({query, currentPage}:{
    query: string
    currentPage: number
}) {
    const students = await fetchFilteredInvoices(query, currentPage)


    return (
        <div className="space-y-8">
            <p className="text-2xl font-medium">Found {students.length} results</p>
            {students.map((student) => {
                return (
                    <StudentCard
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