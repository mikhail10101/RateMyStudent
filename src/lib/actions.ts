'use server';

import { Student, Rating, User } from './definitions';
import { randomUUID } from 'crypto';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '../auth';
import { AuthError } from 'next-auth';
import bcrypt from 'bcrypt'

import { fetchUserByEmail } from './data';

import { auth } from '../auth';

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
    VALUES (${id}, ${student_id}, ${commenter_id}, ${rating}, ${noise}, ${classroom}, ${grade}, ${attendance}, ${likes}, ${dislikes}, ${comment}, ${date.toDateString() + " " + +date.getHours() + ":" + +date.getMinutes() + ":" + +date.getSeconds()})
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

    revalidatePath(`/account/ratings`)
    redirect(`/account/ratings`)
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

export async function CreateUser(
    prevState: string | undefined,
    val: User
) {
    var result = "Success";

    

    try {
        val.id = randomUUID()
        val.password = await bcrypt.hash(val.password, 10)

        const { id, username, email, password } = val

        const emailcount = await sql`
            SELECT *
            FROM users
            WHERE email = ${email}
        `
        
        if (emailcount.rowCount == 1) {
            result = "Error"
            return 'Email is already in use'
        }
        

        console.log(emailcount);

        const usercount = await sql`
            SELECT *
            FROM users
            WHERE username = ${username}
        `

        if (usercount.rowCount == 1) {
            result = "Error"
            return 'Username is already taken'
        }

        await sql`
        INSERT INTO users (id, username, email, password)
        VALUES (${id}, ${username}, ${email}, ${password})
        `;
        
    } catch (e) {
        console.log(e)
        result = "Error"
        return "Error"

    } finally {
        if (result === "Success") {
            revalidatePath(`/`)
            redirect(`/`)
        }
    }
}

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await signIn('credentials', formData);

    } catch (error) {
        if (error instanceof AuthError) {
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
        const hashed_new = await bcrypt.hash(password, 10)
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

export async function Vote(rating_id: string, up: number) {
    const session = await auth()
    if (session) {
        const user = await fetchUserByEmail(session?.user?.email || "")
        const data = await sql`
            SELECT *
            FROM votes
            WHERE voter_id = ${user.id} AND rating_id = ${rating_id}
        `
        if (data.rows.length == 0) {
            await sql`
            INSERT INTO votes (voter_id, rating_id, val)
            VALUES (${user.id},${rating_id},${up})
            `

            if (up == 1) {
                await sql`
                UPDATE ratings
                SET likes = likes+1
                WHERE id = ${rating_id}
                `
            } else {
                await sql`
                UPDATE ratings
                SET dislikes = dislikes+1
                WHERE id = ${rating_id}
                `
            }
        } else {
            const vote = data.rows[0]
            if (vote.val == up) {
                await sql`
                DELETE FROM votes
                WHERE voter_id = ${user.id} AND rating_id = ${rating_id}
                `
                if (up == 1) {
                    await sql`
                    UPDATE ratings
                    SET likes = likes-1
                    WHERE id = ${rating_id}
                    `
                } else {
                    await sql`
                    UPDATE ratings
                    SET dislikes = dislikes-1
                    WHERE id = ${rating_id}
                    `
                }

            } else {
                await sql`
                UPDATE votes
                SET val = ${up}
                WHERE voter_id = ${user.id} AND rating_id = ${rating_id}
                `
                if (up == 1) {
                    await sql`
                    UPDATE ratings
                    SET likes = likes+1, dislikes = dislikes-1
                    WHERE id = ${rating_id}
                    `
                } else {
                    await sql`
                    UPDATE ratings
                    SET dislikes = dislikes+1, likes = likes-1
                    WHERE id = ${rating_id}
                    `
                }
            }
        }
    }
}