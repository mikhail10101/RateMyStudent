const { db } = require('@vercel/postgres')
const bcrypt = require('bcrypt')
const { users, students, ratings } = require('../src/lib/placeholder-data.js')

async function seedUsers(client) {
    try {
      await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
      // Create the "invoices" table if it doesn't exist
      const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS users (
          id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
          username VARCHAR(255) NOT NULL,
          email TEXT NOT NULL UNIQUE,
          password TEXT NOT NULL
        );
      `;
  
      console.log(`Created "users" table`);
      console.log(users)
  
      // Insert data into the "users" table
      const insertedUsers = await Promise.all(
        users.map(async (user) => {
          const hashedPassword = await bcrypt.hash(user.password, 10);
          return client.sql`
          INSERT INTO users (id, username, email, password)
          VALUES (${user.id}, ${user.username}, ${user.email}, ${hashedPassword})
          ON CONFLICT (id) DO NOTHING;
        `;
        }),
      );
  
      console.log(`Seeded ${insertedUsers.length} users`);
  
      return {
        createTable,
        users: insertedUsers,
      };
    } catch (error) {
      console.error('Error seeding users:', error);
      throw error;
    }
  }

async function main() {
    const client = await db.connect();

    await seedStudents(client);

    await client.end();
}

async function seedStudents(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "invoices" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS students (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        firstname VARCHAR(255) NOT NULL,
        lastname VARCHAR(255) NOT NULL,
        birthday DATE NOT NULL,
        email TEXT NOT NULL UNIQUE,
        school VARCHAR(255) NOT NULL,
        major VARCHAR(255) NOT NULL,
        rating FLOAT NOT NULL,
        amount INT NOT NULL,
        noise INT NOT NULL
      );
    `;

    console.log(`Created "students" table`);
    console.log(students)

    // Insert data into the "students" table
    const insertedStudents = await Promise.all(
      students.map(async (student) => {
        return client.sql`
        INSERT INTO students (id, firstname, lastname, birthday, email, school, major, rating, amount, noise)
        VALUES (${student.id}, ${student.firstname}, ${student.lastname}, ${student.birthday}, ${student.email}, ${student.school}, ${student.major}, ${student.rating}, ${student.amount}, ${student.noise})
        ON CONFLICT (id) DO NOTHING;
      `;
      }),
    );

    console.log(`Seeded ${insertedStudents.length} students`);

    return {
      createTable,
      students: insertedStudents,
    };
  } catch (error) {
    console.error('Error seeding students:', error);
    throw error;
  }
}

async function seedRatings(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`

    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS ratings (
        id UUID DEFAULT uuid_generate_v4() NOT NULL,
        student_id UUID DEFAULT uuid_generate_v4() NOT NULL,
        commenter_id UUID DEFAULT uuid_generate_v4() NOT NULL,
        rating INT,
        noise INT,
        classroom VARCHAR(30) NOT NULL,
        grade VARCHAR(30),
        attendance INT,
        likes INT NOT NULL,
        dislikes INT NOT NULL,
        comment VARCHAR(1023),
        date DATE NOT NULL
      );
    `
      
    console.log(`Created "ratings" table`);
    console.log(ratings)

    const insertedRatings = await Promise.all(
      ratings.map(async (rating) => {
        return client.sql`
        INSERT INTO ratings (id, student_id, commenter_id, rating, noise, classroom, grade, attendance, likes, dislikes, comment, date)
        VALUES (${rating.id}, ${rating.student_id}, ${rating.commenter_id}, ${rating.rating}, ${rating.noise}, ${rating.classroom}, ${rating.grade}, ${rating.attendance}, ${rating.likes}, ${rating.dislikes}, ${rating.comment}, ${rating.date})
        `
      })
    )

    console.log(`Seeded ${insertedRatings.length} ratings`);
    return {
      createTable,
      ratings: insertedRatings,
    }

  } catch (error) {
    console.log('Error seeding ratings:', error)
    throw error
  }
}

main().catch((err) => {
    console.error(
      'An error occurred while attempting to seed the database:',
      err,
    );
  });