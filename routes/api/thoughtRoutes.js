const router = require('express').Router();
const { getThoughts } = require('../../controllers/thoughtsController');

// api/thoughts
router.route('/').get(getThoughts);

module.exports = router;