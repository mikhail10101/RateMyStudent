import { sql } from '@vercel/postgres'
import { unstable_noStore as noStore } from 'next/cache'
import { User, Student, Rating } from './definitions'

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

const ITEMS_PER_PAGE = 7;
export async function fetchFilteredStudents(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  noStore();
  try {
    const students = await sql<Student>`
      SELECT
        *
      FROM students
      WHERE
        students.firstname ILIKE ${`%${query}%`} OR
        students.lastname ILIKE ${`%${query}%`} OR
        students.email::text ILIKE ${`%${query}%`}
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;
    students.rows.map((row) => {
      if (row.amount == 0) {
        row.rating = 0
        row.noise = 0
      } else {
        row.rating = Math.round(row.rating / row.amount)
        row.noise = Math.round(row.noise / row.amount)
      }
      
    })
    return students.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
}

export async function fetchStudentPages(query: string) {
    noStore();
    try {
      const count = await sql`SELECT COUNT(*)
      FROM students
      WHERE
        students.firstname ILIKE ${`%${query}%`} OR
        students.lastname ILIKE ${`%${query}%`} OR
        students.email::text ILIKE ${`%${query}%`}
    `;
  
      const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
      return totalPages;
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch total number of invoices.');
    }
  }

export async function fetchFilteredStudentsCount(query: string) {
  noStore();
  try {
    const count = await sql`SELECT COUNT(*)
    FROM students
    WHERE
      students.firstname ILIKE ${`%${query}%`} OR
      students.lastname ILIKE ${`%${query}%`} OR
      students.email::text ILIKE ${`%${query}%`}
  `;

    const totalPages = Number(count.rows[0].count);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}

export async function fetchStudentById(id: string) {
  noStore()
  try {
    const data = await sql<Student>`
      SELECT *
      FROM students
      WHERE students.id = ${id};
    `
    
    data.rows[0].rating = Math.round(data.rows[0].rating / data.rows[0].amount)
    data.rows[0].noise = Math.round(data.rows[0].noise / data.rows[0].amount)
    return data.rows[0]
  } catch(error) {
    console.log('Database Error: ', error)
    throw new Error(`Failed to fetch Student ${id}`)
  }
}

const ITEMS_PER_FETCH = 1
export async function fetchRatingIdsById(id: string) {
  noStore()
  try {
    const data = await sql`
      SELECT id
      FROM ratings
      WHERE ratings.student_id = ${id}
      ORDER BY date desc
    `
    return data.rows
  } catch (error) {
    console.log('Database error', error)
    throw new Error('Failed to fetch RatingIds')
  }
}

export async function fetchRatingById(id: string) {
  noStore()
  try {
    const data = await sql<Rating>`
      SELECT *
      FROM ratings
      WHERE ratings.id = ${id}
    `
    return data.rows[0]
  } catch (error) {
    console.log('Database error', error)
    throw new Error('Failed to fetch Ratings')
  }
}

export async function fetchUserById(id: string) {
  noStore()
  try {
    const data = await sql<User>`
      SELECT *
      FROM users
      WHERE users.id = ${id}
    `
    return data.rows[0]
  } catch (error) {
    console.log('Database error', error)
    throw new Error('Failed to fetch User')
  }
}

export async function fetchUserByEmail(email: string) {
  noStore()
  try {
    const data = await sql<User>`
      SELECT *
      FROM users
      WHERE users.email = ${email}
    `
    return data.rows[0]
  } catch (error) {
    console.log('Database error', error)
    throw new Error('Failed to fetch User')
  }
}