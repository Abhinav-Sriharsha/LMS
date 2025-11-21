// Sample data seeding script for LMS
const mysql = require('mysql');
require('dotenv').config({ path: './Node/.env' });

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

connection.connect((err) => {
  if (err) {
    console.error('Connection failed:', err.message);
    process.exit(1);
  }

  console.log('🔌 Connected to database!');
  console.log('📝 Seeding sample data...\n');

  // Sample users
  const users = [
    // Admin
    { email: 'admin@lms.com', password: 'Admin@123', name: 'Admin User', userTypeCode: 'ADMIN' },

    // Faculty
    { email: 'faculty1@lms.com', password: 'Faculty@123', name: 'Dr. John Smith', userTypeCode: 'FACULTY' },
    { email: 'faculty2@lms.com', password: 'Faculty@123', name: 'Prof. Sarah Johnson', userTypeCode: 'FACULTY' },

    // Students
    { email: 'student1@lms.com', password: 'Student@123', name: 'Alice Brown', userTypeCode: 'STUDENT' },
    { email: 'student2@lms.com', password: 'Student@123', name: 'Bob Wilson', userTypeCode: 'STUDENT' },
    { email: 'student3@lms.com', password: 'Student@123', name: 'Carol Davis', userTypeCode: 'STUDENT' },
    { email: 'student4@lms.com', password: 'Student@123', name: 'David Miller', userTypeCode: 'STUDENT' },
  ];

  // Sample semesters
  const semesters = [
    { semesterName: 'Fall 2024', startDate: '2024-09-01', endDate: '2024-12-15' },
    { semesterName: 'Spring 2025', startDate: '2025-01-15', endDate: '2025-05-15' },
  ];

  // First, insert semesters
  console.log('📚 Inserting semesters...');
  const insertSemesterSql = 'INSERT INTO semesters (semesterName, startDate, endDate) VALUES ?';
  const semesterValues = semesters.map((s) => [s.semesterName, s.startDate, s.endDate]);

  connection.query(insertSemesterSql, [semesterValues], (err) => {
    if (err) {
      console.error('Error inserting semesters:', err.message);
    } else {
      console.log('✅ Semesters inserted');
    }

    // Then insert users
    console.log('👥 Inserting users...');
    const insertUserSql = 'INSERT INTO users (email, password, name, userTypeCode) VALUES ?';
    const userValues = users.map((u) => [u.email, u.password, u.name, u.userTypeCode]);

    connection.query(insertUserSql, [userValues], (err, results) => {
      if (err) {
        console.error('Error inserting users:', err.message);
      } else {
        console.log('✅ Users inserted');
        const startUserId = results.insertId;

        // Get faculty IDs
        const facultyEmails = ['faculty1@lms.com', 'faculty2@lms.com'];
        connection.query('SELECT userId FROM users WHERE email IN (?)', [facultyEmails], (err, facultyResults) => {
          if (err) {
            console.error('Error getting faculty IDs:', err.message);
            connection.end();
            return;
          }

          const faculty1Id = facultyResults[0].userId;
          const faculty2Id = facultyResults[1].userId;

          // Sample courses
          const courses = [
            {
              title: 'Introduction to Computer Science',
              description: 'Learn the fundamentals of programming and algorithms',
              facultyId: faculty1Id,
              semesterId: 1,
              isPublished: 'yes',
            },
            {
              title: 'Data Structures and Algorithms',
              description: 'Deep dive into DSA with hands-on projects',
              facultyId: faculty1Id,
              semesterId: 1,
              isPublished: 'yes',
            },
            {
              title: 'Web Development Fundamentals',
              description: 'HTML, CSS, JavaScript, and modern web frameworks',
              facultyId: faculty2Id,
              semesterId: 1,
              isPublished: 'yes',
            },
            {
              title: 'Database Management Systems',
              description: 'SQL, NoSQL, and database design principles',
              facultyId: faculty2Id,
              semesterId: 1,
              isPublished: 'yes',
            },
          ];

          console.log('📖 Inserting courses...');
          const insertCourseSql = 'INSERT INTO courses (title, description, facultyId, semesterId, isPublished) VALUES ?';
          const courseValues = courses.map((c) => [c.title, c.description, c.facultyId, c.semesterId, c.isPublished]);

          connection.query(insertCourseSql, [courseValues], (err, courseResults) => {
            if (err) {
              console.error('Error inserting courses:', err.message);
            } else {
              console.log('✅ Courses inserted');
              const courseStartId = courseResults.insertId;

              // Get student IDs
              const studentEmails = ['student1@lms.com', 'student2@lms.com', 'student3@lms.com', 'student4@lms.com'];
              connection.query('SELECT userId FROM users WHERE email IN (?)', [studentEmails], (err, studentResults) => {
                if (err) {
                  console.error('Error getting student IDs:', err.message);
                  connection.end();
                  return;
                }

                // Enroll students in courses
                const enrollments = [];
                for (let i = 1; i <= 4; i++) {
                  for (let j = 1; j <= 4; j++) {
                    if (i !== j) {
                      enrollments.push([studentResults[i - 1].userId, courseStartId + j - 1]);
                    }
                  }
                }

                console.log('✏️  Enrolling students in courses...');
                const insertEnrollmentSql = 'INSERT INTO enrollments (studentId, courseId) VALUES ?';
                connection.query(insertEnrollmentSql, [enrollments], (err) => {
                  if (err) {
                    console.error('Error inserting enrollments:', err.message);
                  } else {
                    console.log('✅ Enrollments created');
                  }

                  // Sample assignments
                  const assignments = [
                    {
                      courseId: courseStartId,
                      title: 'Assignment 1: Basic Variables and Data Types',
                      description: 'Complete exercises on variables, data types, and basic operations',
                      dueDate: '2024-09-15 23:59:59',
                      isPublished: 'yes',
                    },
                    {
                      courseId: courseStartId,
                      title: 'Assignment 2: Control Flow',
                      description: 'Write programs using if-else, loops, and switch statements',
                      dueDate: '2024-09-30 23:59:59',
                      isPublished: 'yes',
                    },
                    {
                      courseId: courseStartId + 1,
                      title: 'Assignment 1: Sorting Algorithms',
                      description: 'Implement bubble sort, merge sort, and quick sort',
                      dueDate: '2024-10-05 23:59:59',
                      isPublished: 'yes',
                    },
                  ];

                  console.log('📝 Inserting assignments...');
                  const insertAssignmentSql = 'INSERT INTO assignments (courseId, title, description, dueDate, isPublished) VALUES ?';
                  const assignmentValues = assignments.map((a) => [a.courseId, a.title, a.description, a.dueDate, a.isPublished]);

                  connection.query(insertAssignmentSql, [assignmentValues], (err) => {
                    if (err) {
                      console.error('Error inserting assignments:', err.message);
                    } else {
                      console.log('✅ Assignments inserted');
                    }

                    // Sample quizzes
                    const quizzes = [
                      {
                        courseId: courseStartId,
                        title: 'Quiz 1: Variables and Data Types',
                        description: '10 multiple choice questions',
                        dueDate: '2024-09-10 23:59:59',
                        isPublished: 'yes',
                      },
                      {
                        courseId: courseStartId + 1,
                        title: 'Quiz 1: Data Structures Basics',
                        description: '15 multiple choice and short answer questions',
                        dueDate: '2024-10-01 23:59:59',
                        isPublished: 'yes',
                      },
                    ];

                    console.log('❓ Inserting quizzes...');
                    const insertQuizSql = 'INSERT INTO quizzes (courseId, title, description, dueDate, isPublished) VALUES ?';
                    const quizValues = quizzes.map((q) => [q.courseId, q.title, q.description, q.dueDate, q.isPublished]);

                    connection.query(insertQuizSql, [quizValues], (err) => {
                      if (err) {
                        console.error('Error inserting quizzes:', err.message);
                      } else {
                        console.log('✅ Quizzes inserted');
                      }

                      // Sample announcements
                      const announcements = [
                        {
                          courseId: courseStartId,
                          facultyId: faculty1Id,
                          title: 'Welcome to the Course',
                          content: 'Welcome to Introduction to Computer Science! This is where I will post all course announcements and updates.',
                        },
                        {
                          courseId: courseStartId,
                          facultyId: faculty1Id,
                          title: 'Assignment 1 is now available',
                          content: 'Please submit your assignment by September 15, 2024. Late submissions will not be accepted.',
                        },
                      ];

                      console.log('📢 Inserting announcements...');
                      const insertAnnouncementSql = 'INSERT INTO announcements (courseId, facultyId, title, content) VALUES ?';
                      const announcementValues = announcements.map((a) => [a.courseId, a.facultyId, a.title, a.content]);

                      connection.query(insertAnnouncementSql, [announcementValues], (err) => {
                        if (err) {
                          console.error('Error inserting announcements:', err.message);
                        } else {
                          console.log('✅ Announcements inserted');
                        }

                        // Sample grades
                        const grades = [
                          { studentId: studentResults[0].userId, courseId: courseStartId, grade: 92.5 },
                          { studentId: studentResults[1].userId, courseId: courseStartId, grade: 88.0 },
                          { studentId: studentResults[2].userId, courseId: courseStartId, grade: 95.5 },
                          { studentId: studentResults[3].userId, courseId: courseStartId, grade: 87.0 },
                          { studentId: studentResults[0].userId, courseId: courseStartId + 1, grade: 90.0 },
                        ];

                        console.log('⭐ Inserting grades...');
                        const insertGradeSql = 'INSERT INTO grades (studentId, courseId, grade) VALUES ?';
                        const gradeValues = grades.map((g) => [g.studentId, g.courseId, g.grade]);

                        connection.query(insertGradeSql, [gradeValues], (err) => {
                          if (err) {
                            console.error('Error inserting grades:', err.message);
                          } else {
                            console.log('✅ Grades inserted');
                          }

                          console.log('\n🎉 All sample data inserted successfully!\n');
                          console.log('Test Credentials:');
                          console.log('─────────────────────────────────────');
                          console.log('Admin:');
                          console.log('  Email: admin@lms.com');
                          console.log('  Password: Admin@123\n');
                          console.log('Faculty:');
                          console.log('  Email: faculty1@lms.com');
                          console.log('  Password: Faculty@123\n');
                          console.log('Student:');
                          console.log('  Email: student1@lms.com');
                          console.log('  Password: Student@123\n');
                          console.log('─────────────────────────────────────\n');

                          connection.end();
                          process.exit(0);
                        });
                      });
                    });
                  });
                });
              });
            }
          });
        });
      }
    });
  });
});

connection.on('error', (err) => {
  console.error('Database error:', err.message);
  process.exit(1);
});
