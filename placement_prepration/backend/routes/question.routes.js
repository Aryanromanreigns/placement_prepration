const express = require('express');
const router = express.Router();
const questions = require('../data/questions');

// GET QUESTIONS BY COMPANY + DIFFICULTY
router.get('/', (req, res) => {
  const { company, difficulty } = req.query;

  let result = questions;

  if (company) {
    result = result.filter(q =>
      q.companies.includes(company)
    );
  }

  if (difficulty && difficulty !== 'All') {
    result = result.filter(q =>
      q.difficulty === difficulty
    );
  }

  res.json(result);
});

module.exports = router;
