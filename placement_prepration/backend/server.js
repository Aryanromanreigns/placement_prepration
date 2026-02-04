const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth.routes');
const companyRoutes = require('./routes/company.routes');
const questionRoutes = require('./routes/question.routes');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/company', companyRoutes);
app.use('/api/questions', questionRoutes);

app.get('/', (req, res) => {
  res.send('PrepAI+ Backend Running');
});

app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
});
