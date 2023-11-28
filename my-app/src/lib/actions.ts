'use server';

import { Student, Rating } from './definitions';
import { randomUUID } from 'crypto';
import { sql } from '@vercel/postgres';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function CreateRating(val: Rating) {
    val.id = randomUUID()
    
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