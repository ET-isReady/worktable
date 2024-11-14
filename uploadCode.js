const Post = require('../models/Post')
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model('User')
const ErrorHandler = require('../utils/ErrorHandler.js')



module.exports = router