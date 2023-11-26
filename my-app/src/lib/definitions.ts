export type Student = {
    id: string,
    firstname: string,
    lastname: string,
    birthday: Date,
    email: string,
    school: string,
    major: string,
    rating: number,
    amount: number,
    noise: number
}

export type Rating = {
    id: string,
    student_id: string,
    commenter_id: string,
    rating: number,
    noise: number,
    classroom: string,
    grade: string,
    attendance: number,
    likes: string,
    dislikes: string,
    comment: string,
    date: Date
}