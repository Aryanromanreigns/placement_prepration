const express = require('express');
const router = express.Router();
const companies = require('../data/companies');

// GET COMPANY DATA
router.get('/:name', (req, res) => {
  const name = req.params.name;

  const company = companies[name];

  if (!company) {
    return res.json({
      name,
      topics: [
        'Custom Algorithms',
        `${name} Stack Specific`,
        'General CS Fundamentals'
      ],
      process: [
        'HR Screening',
        'Technical Take-Home',
        'Panel Interview'
      ],
      generated: true
    });
  }

  res.json(company);
});

module.exports = router;
