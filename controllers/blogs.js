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


export {
  index
}