import { BlogPost } from "../models/blogPost.js";
import { Profile } from "../models/profile.js";

function index(req, res) {
  BlogPost.find({})
  .then(blogs => {
    res.render('blogs/index', {
      blogs,
      title: 'Blogs'
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function newBlog(req, res) {
  console.log(req.body, 'req.body')
  console.log(req.params, 'req.params')
  res.render('blogs/new', {
    title: 'Write New Blog Post',
  })
}

function create(req, res) {
  req.body.author = req.user.profile._id
}


export {
  index,
  newBlog as new,
  create,
}

// console.log(req.body, 'req.body')
// console.log(req.params, 'req.params')