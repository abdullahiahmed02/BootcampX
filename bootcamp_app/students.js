const { Pool } = require('pg');

const pool = new Pool({
  user: 'hamzaghelle',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});
const cohortName = process.argv[2];
const limit = process.argv[3] || 5;

const values = [`%${cohortName}%`, limit];

pool.query(`
SELECT students.id as id, students.name as student, cohorts.name as cohort 
FROM students
JOIN cohorts ON cohorts.id = cohort_id
WHERE cohorts.name LIKE $1
LIMIT $2;
`, values)
.then(res => {
  res.rows.forEach(user => {
    console.log(`${user.student} has an id of ${user.student_id} and was in the ${user.cohort} cohort`);
  })
});