// Database setup script - creates the lms database and tables
const mysql = require('mysql');
require('dotenv').config({ path: './Node/.env' });

// First connect without specifying database
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

console.log('🔌 Connecting to AWS RDS...');

connection.connect((err) => {
  if (err) {
    console.error('❌ Connection FAILED:', err.message);
    process.exit(1);
  }

  console.log('✅ Connected to RDS!');
  console.log('');

  // Create database
  console.log('📊 Creating "lms" database...');
  connection.query('CREATE DATABASE IF NOT EXISTS lms', (error) => {
    if (error) {
      console.error('❌ Failed to create database:', error.message);
      connection.end();
      process.exit(1);
    }

    console.log('✅ Database "lms" created successfully!');
    console.log('');

    // Select the database
    connection.query('USE lms', (error) => {
      if (error) {
        console.error('❌ Failed to select database:', error.message);
        connection.end();
        process.exit(1);
      }

      console.log('📋 Creating tables...');
      createTables();
    });
  });
});

function createTables() {
  // SQL statements to create tables
  const tables = [
    `CREATE TABLE IF NOT EXISTS users (
      userId INT AUTO_INCREMENT PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      name VARCHAR(255) NOT NULL,
      userTypeCode ENUM('ADMIN', 'FACULTY', 'STUDENT') NOT NULL,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`,

    `CREATE TABLE IF NOT EXISTS courses (
      courseId INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      facultyId INT NOT NULL,
      semesterId INT,
      isPublished ENUM('yes', 'no') DEFAULT 'no',
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (facultyId) REFERENCES users(userId)
    )`,

    `CREATE TABLE IF NOT EXISTS assignments (
      assignmentId INT AUTO_INCREMENT PRIMARY KEY,
      courseId INT NOT NULL,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      dueDate DATETIME,
      isPublished ENUM('yes', 'no') DEFAULT 'no',
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (courseId) REFERENCES courses(courseId)
    )`,

    `CREATE TABLE IF NOT EXISTS quizzes (
      quizId INT AUTO_INCREMENT PRIMARY KEY,
      courseId INT NOT NULL,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      dueDate DATETIME,
      isPublished ENUM('yes', 'no') DEFAULT 'no',
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (courseId) REFERENCES courses(courseId)
    )`,

    `CREATE TABLE IF NOT EXISTS grades (
      gradeId INT AUTO_INCREMENT PRIMARY KEY,
      studentId INT NOT NULL,
      courseId INT NOT NULL,
      grade DECIMAL(5, 2),
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (studentId) REFERENCES users(userId),
      FOREIGN KEY (courseId) REFERENCES courses(courseId)
    )`,

    `CREATE TABLE IF NOT EXISTS announcements (
      announcementId INT AUTO_INCREMENT PRIMARY KEY,
      courseId INT NOT NULL,
      facultyId INT NOT NULL,
      title VARCHAR(255) NOT NULL,
      content TEXT,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (courseId) REFERENCES courses(courseId),
      FOREIGN KEY (facultyId) REFERENCES users(userId)
    )`,

    `CREATE TABLE IF NOT EXISTS semesters (
      semesterId INT AUTO_INCREMENT PRIMARY KEY,
      semesterName VARCHAR(255) NOT NULL,
      startDate DATE,
      endDate DATE,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`,

    `CREATE TABLE IF NOT EXISTS enrollments (
      enrollmentId INT AUTO_INCREMENT PRIMARY KEY,
      studentId INT NOT NULL,
      courseId INT NOT NULL,
      enrolledAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (studentId) REFERENCES users(userId),
      FOREIGN KEY (courseId) REFERENCES courses(courseId),
      UNIQUE KEY unique_enrollment (studentId, courseId)
    )`
  ];

  let completedTables = 0;

  tables.forEach((sql, index) => {
    connection.query(sql, (error) => {
      if (error) {
        console.error(`❌ Failed to create table ${index + 1}:`, error.message);
      } else {
        completedTables++;
        console.log(`✅ Table ${index + 1}/${tables.length} created`);
      }

      if (completedTables === tables.length) {
        console.log('');
        console.log('🎉 Database setup complete!');
        console.log('');
        console.log('Tables created:');
        console.log('  ✓ users');
        console.log('  ✓ courses');
        console.log('  ✓ assignments');
        console.log('  ✓ quizzes');
        console.log('  ✓ grades');
        console.log('  ✓ announcements');
        console.log('  ✓ semesters');
        console.log('  ✓ enrollments');
        console.log('');
        console.log('Your LMS database is ready to use!');
        connection.end();
        process.exit(0);
      }
    });
  });
}

connection.on('error', (err) => {
  console.error('❌ Connection error:', err.message);
  process.exit(1);
});
