'use server';

import { Student, Rating, User } from './definitions';
import { randomUUID } from 'crypto';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '../../auth';
import { AuthError } from 'next-auth';
import bcrypt from 'bcrypt'

import { auth } from '../../auth';

export async function CreateRating(val: Rating) {
    val.id = randomUUID()
    const session = await auth()

    const email = session?.user?.email || ""

    const data = await sql`
    SELECT id
    FROM users
    WHERE email = ${email}
    `
    val.commenter_id = data.rows[0].id

    const { id, student_id, commenter_id, rating, noise, classroom, grade, attendance, likes, dislikes, comment, date } = val

    await sql`
    INSERT INTO ratings (id, student_id, commenter_id, rating, noise, classroom, grade, attendance, likes, dislikes, comment, date)
    VALUES (${id}, ${student_id}, ${commenter_id}, ${rating}, ${noise}, ${classroom}, ${grade}, ${attendance}, ${likes}, ${dislikes}, ${comment}, ${date.toDateString()})
    `;

    await sql`
    UPDATE students
    SET amount = amount+1, rating = rating+${rating}, noise = noise+${noise}
    WHERE id = ${student_id}
    `;

    revalidatePath(`/student/${student_id}`)
    redirect(`/student/${student_id}`)
}

export async function UpdateRating(val: Rating, prevRating: number, prevNoise: number) {
    const { id, student_id, commenter_id, rating, noise, classroom, grade, attendance, likes, dislikes, comment, date } = val

    await sql`
    UPDATE ratings
    SET rating = ${rating}, noise = ${noise}, classroom = ${classroom}, attendance = ${attendance}, grade = ${grade}, comment = ${comment}
    WHERE id = ${id}
    `

    await sql`
    UPDATE students
    SET rating = rating-${rating}, noise = noise-${prevNoise}+${noise}
    WHERE id = ${student_id}
    `

    revalidatePath(`/account`)
    redirect(`/account`)
}

export async function CreateStudent(val: Student) {
    val.id = randomUUID()

    const { id, firstname, lastname, birthday, email, school, major, rating, amount, noise } = val

    await sql`
    INSERT INTO students (id, firstname, lastname, birthday, email, school, major, rating, amount, noise)
    VALUES (${id}, ${firstname}, ${lastname}, ${birthday.toDateString()}, ${email}, ${school}, ${major}, ${rating}, ${amount}, ${noise})
    `;

    revalidatePath(`/student/${id}`)
    redirect(`/student/${id}`)
}

export async function CreateUser(val: User) {
    val.id = randomUUID()
    val.password = await bcrypt.hash(val.password, 10)

    const { id, username, email, password } = val

    await sql`
    INSERT INTO users (id, username, email, password)
    VALUES (${id}, ${username}, ${email}, ${password})
    `;

    revalidatePath(`/`)
    redirect(`/`)
}

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await signIn('credentials', formData);

    } catch (error) {
        if (error instanceof AuthError) {
            console.log("rawr")
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.';
                default:
                    return 'Something went wrong.';
            }
        } else {
            revalidatePath(`/`)
            redirect(`/`)
        }
    }
}

export async function ChangePassword(curr: string, password: string) {
    const session = await auth()

    const data = await sql`
    SELECT password
    FROM users
    WHERE email = ${session?.user?.email}
    `

    if (await bcrypt.compare(curr, data.rows[0].password)) {
        const hashed_new = await bcrypt.hash(password,10)
        await sql`
        UPDATE users
        SET password = ${hashed_new}
        WHERE email = ${session?.user?.email}
        `

        return true
    } else {
        return false
    }
}