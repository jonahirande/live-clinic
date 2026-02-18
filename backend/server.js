const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const db = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// LOGIN
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const result = await db.query('SELECT * FROM users WHERE email=$1', [email]);
  const user = result.rows[0];

  if (!user || password !== 'p@ssw0rd') return res.sendStatus(401);

  const token = jwt.sign(user, process.env.JWT_SECRET);
  res.json({ token, role: user.role });
});

// PATIENT SUBMIT SYMPTOMS
app.post('/patient/case', async (req, res) => {
  const { patient_id, symptoms } = req.body;
  await db.query(
    'INSERT INTO cases (patient_id, symptoms, status) VALUES ($1,$2,$3)',
    [patient_id, symptoms, 'SUBMITTED']
  );
  res.sendStatus(200);
});

// ADMIN ASSIGN DOCTOR
app.post('/admin/assign', async (req, res) => {
  const { case_id, doctor_id } = req.body;
  await db.query(
    'UPDATE cases SET assigned_doctor=$1, status=$2 WHERE id=$3',
    [doctor_id, 'ASSIGNED', case_id]
  );
  res.sendStatus(200);
});

// DOCTOR DIAGNOSE
app.post('/doctor/diagnose', async (req, res) => {
  const { case_id, diagnosis, prescription } = req.body;
  await db.query(
    'UPDATE cases SET diagnosis=$1, prescription=$2, status=$3 WHERE id=$4',
    [diagnosis, prescription, 'COMPLETED', case_id]
  );
  res.sendStatus(200);
});

app.listen(5000, () => console.log('Backend running on port 5000'));