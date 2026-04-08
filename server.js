const express = require('express');
const mysql = require('mysql2');
const app = express();

app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', 
  database: 'fitness_club_15'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Успішне підключення до БД fitness_club_15!');
});

app.get('/classes', (req, res) => {
  db.query('SELECT * FROM classes', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.get('/clients', (req, res) => {
  db.query('SELECT * FROM clients', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.post('/clients', (req, res) => {
  const { full_name, phone } = req.body;
  const query = 'INSERT INTO clients (full_name, phone) VALUES (?, ?)';
  
  db.query(query, [full_name, phone], (err, results) => {
    if (err) throw err;
    res.json({ message: 'Клієнта успішно додано!', client_id: results.insertId });
  });
});

app.put('/clients/:id', (req, res) => {
  const { full_name, phone } = req.body;
  const { id } = req.params;
  const query = 'UPDATE clients SET full_name=?, phone=? WHERE client_id=?';
  
  db.query(query, [full_name, phone, id], (err) => {
    if (err) throw err;
    res.json({ message: 'Дані клієнта оновлено!' });
  });
});

app.delete('/clients/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM clients WHERE client_id=?', [id], (err) => {
    if (err) throw err;
    res.json({ message: 'Клієнта видалено з бази!' });
  });
});

app.listen(3000, () => {
  console.log('Сервер фітнес-клубу запущено на порту 3000 🚀');
});