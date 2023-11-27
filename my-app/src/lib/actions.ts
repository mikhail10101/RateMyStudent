'use server';

import { Rating } from './definitions';
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