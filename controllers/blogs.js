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
  console.log(req.body, 'req.body')
  console.log(req.params, 'req.params')
  req.body.author = req.user.profile._id
  BlogPost.create(req.body)
  .then(blog => {
    Profile.findById(req.user.profile._id)
    .then(profile => {
      profile.blogPosts.push(blog._id)
      profile.save()
      .then(() => {
        res.redirect('/blogs')
      })
      .catch(err => {
        console.log(err)
        res.redirect('/')
      })
    })
    .catch(err => {
      console.log(err)
      res.redirect('/')
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}


export {
  index,
  newBlog as new,
  create,
}

// console.log(req.body, 'req.body')
// console.log(req.params, 'req.params')