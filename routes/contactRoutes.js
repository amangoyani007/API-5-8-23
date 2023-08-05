const express = require('express');
const { getContact, creatContact, updateContact, deleteContact, getContacts } = require('../controllers/contactController');
const router = express.Router();

router.route('/').get(getContacts).post(creatContact);
router.route('/:id').get(getContact).put(updateContact).delete(deleteContact);

module.exports = router;
