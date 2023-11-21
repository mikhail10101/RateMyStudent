import { sql } from '@vercel/postgres'
import { unstable_noStore as noStore } from 'next/cache'
import { Student } from './definitions'

export async function fetchStudents() {
    noStore()
    try {
        const data = await sql<Student>`SELECT * FROM students LIMIT 10`
        return data.rows
    } catch (error) {
        console.error('Database Error:', error)
        throw new Error('Failed to fetch revenue data.')
    }
}