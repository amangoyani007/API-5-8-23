const express = require('express');
const { getContact, creatContact, updateContact, deleteContact, getContacts } = require('../controllers/contactController');
const validateToken = require('../middleware/validateTokenHandler');
const router = express.Router();

router.use(validateToken);

router.route('/').get(getContacts).post(creatContact);
router.route('/:id').get(getContact).put(updateContact).delete(deleteContact);

module.exports = router;
