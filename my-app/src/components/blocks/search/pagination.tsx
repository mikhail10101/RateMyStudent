import { fetchStudents } from "@/lib/data"
import StudentCard from "./student-card"

export default async function Pagination() {
    const students = await fetchStudents()
    console.log(students)

    return (
        <div className="space-y-4">
            {students.map((student) => {
                console.log(student)
                return (
                    <StudentCard
                        key={student.id.toString()}
                        firstname={student.firstname}
                        lastname={student.lastname}
                        school={student.school}
                        rating={student.rating}
                        amount={student.amount}
                    />
                )
            })}
        </div>
    )
}