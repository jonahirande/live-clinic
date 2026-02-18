const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', require('./routes/auth'));
app.use('/patient', require('./routes/patient'));
app.use('/admin', require('./routes/admin'));
app.use('/doctor', require('./routes/doctor'));

app.listen(5000, () => console.log('API running on port 5000'));
