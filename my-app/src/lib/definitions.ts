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
    likes: number,
    dislikes: number,
    comment: string,
    date: Date
}

export type User = {
    id: string,
    username: string,
    email: string,
    password: string
}

export type Vote = {
    voter_id: string,
    rating_id: string,
    val: number
}