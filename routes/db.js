const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '1start2start!',
  database: 'workout_tracker'
});

function getWorkoutNames(callback) {
  connection.query('SELECT name FROM workout', callback);
}

module.exports = { getWorkoutNames, connection };
