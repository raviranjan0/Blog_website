const express = require('express');
const blogcontroller = require('../controller/blogcontroller');
const blogroute = express.Router();

blogroute.route('/').get(blogcontroller.bloghome);
blogroute.route('/about').get(blogcontroller.blogabout);
blogroute.route('/contact').get(blogcontroller.blogcontact);
blogroute.route('/search').get(blogcontroller.blogpost);
blogroute.route('/compose').get(blogcontroller.blogcompose).post(blogcontroller.blogcomposePOST);


module.exports = blogroute;