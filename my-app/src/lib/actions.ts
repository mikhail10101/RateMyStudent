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

    //user2
    val.commenter_id = session?.user?.id || "410544b2-4002-4271-9855-fec4b6a6442a"

    const { id, student_id, commenter_id, rating, noise, classroom, grade, attendance, likes, dislikes, comment, date } = val

    await sql`
    INSERT INTO ratings (id, student_id, commenter_id, rating, noise, classroom, grade, attendance, likes, dislikes, comment, date)
    VALUES (${id}, ${student_id}, ${commenter_id}, ${rating}, ${noise}, ${classroom}, ${grade}, ${attendance}, ${likes}, ${dislikes}, ${comment}, ${date.toDateString()})
    `;

    revalidatePath(`/student/${student_id}`)
    redirect(`/student/${student_id}`)
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