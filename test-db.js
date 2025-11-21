// Quick database connection test
const mysql = require('mysql');
require('dotenv').config({ path: './Node/.env' });

const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'lms-db.ch2oicokcn7t.us-east-2.rds.amazonaws.com',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'KKdFqYn2HgbpSjJU1TKr',
  database: process.env.DB_NAME || 'lms',
});

console.log('🔌 Attempting to connect to RDS...');
console.log('Host:', process.env.DB_HOST || 'lms-db.ch2oicokcn7t.us-east-2.rds.amazonaws.com');
console.log('Database:', process.env.DB_NAME || 'lms');
console.log('');

connection.connect((err) => {
  if (err) {
    console.error('❌ Connection FAILED:');
    console.error(err.message);
    process.exit(1);
  }

  console.log('✅ Connected successfully!');
  console.log('Connection ID:', connection.threadId);
  console.log('');

  // Test a simple query
  console.log('📊 Checking database tables...');
  connection.query('SHOW TABLES;', (error, results) => {
    if (error) {
      console.error('❌ Query FAILED:', error.message);
      connection.end();
      process.exit(1);
    }

    console.log('✅ Tables found:');
    if (results.length === 0) {
      console.log('   (No tables - database is empty)');
    } else {
      results.forEach((row) => {
        const tableName = Object.values(row)[0];
        console.log(`   - ${tableName}`);
      });
    }

    console.log('');
    console.log('🎉 All tests passed! Your RDS is working correctly.');
    connection.end();
    process.exit(0);
  });
});

connection.on('error', (err) => {
  console.error('❌ Connection error:', err.message);
  process.exit(1);
});
