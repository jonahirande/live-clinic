CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password TEXT,
  role VARCHAR(20)
);

CREATE TABLE cases (
  id SERIAL PRIMARY KEY,
  patient_id INT REFERENCES users(id),
  symptoms TEXT,
  assigned_doctor INT REFERENCES users(id),
  diagnosis TEXT,
  prescription TEXT,
  status VARCHAR(30),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- password = p@ssw0rd
INSERT INTO users (name, email, password, role) VALUES
('Admin', 'admin@live-clinic.com', '$2a$10$7aQZk9M0VJtH2b8YJYpHMeYx7kOQ9Lxv3v7pKz9Qb6zQ4ZC8u0X9y', 'admin'),
('Jonah Irande', 'jonah@live-clinic.com', '$2a$10$7aQZk9M0VJtH2b8YJYpHMeYx7kOQ9Lxv3v7pKz9Qb6zQ4ZC8u0X9y', 'doctor'),
('Oluwatosin Daniel', 'oluwatosin@live-clinic.com', '$2a$10$7aQZk9M0VJtH2b8YJYpHMeYx7kOQ9Lxv3v7pKz9Qb6zQ4ZC8u0X9y', 'doctor'),
('Faith Bitrus', 'faith@live-clinic.com', '$2a$10$7aQZk9M0VJtH2b8YJYpHMeYx7kOQ9Lxv3v7pKz9Qb6zQ4ZC8u0X9y', 'doctor');
