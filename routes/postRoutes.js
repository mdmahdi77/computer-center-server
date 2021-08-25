const express = require('express');
const router = express.Router()

// import controllers methods
const { create, postList, read, updatePost, removePost } = require('../controllers/postControllers');

const { isAuthenticated, authorizeRoles } = require('../middleware/auth');

router.post('/post', create)
router.get('/posts', postList)
router.get('/post/:slug', read)
router.put('/post/:slug', updatePost)
router.delete('/post/:slug', removePost)

module.exports = router