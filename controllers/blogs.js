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

function show(req, res) {
  BlogPost.findById(req.params.id)
  .populate('author')
  .populate('comments.author')
  .then(blog => {
    res.render('blogs/show', {
      title: blog.title,
      blog,
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/blogs')
  })
}

function edit(req, res) {
  BlogPost.findById(req.params.id)
  .then(blog => {
    res.render('blogs/edit', {
      title: 'Edit Blog Post',
      blog
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/blogs/show')
  })
}

function update(req, res) {
  BlogPost.findById(req.params.id)
  .then(blog => {
    if (blog.author.equals(req.user.profile._id)) {
      blog.updateOne(req.body)
      .then(() => {
        res.redirect(`/blogs/${blog._id}`)
      })
    } else {
      throw new Error('Not Authorized: User does not match BlogPost.author')
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect('/blogs/show')
  })
}

function deleteBlog(req, res) {
  BlogPost.findById(req.params.id)
  .then(blog => {
    if (blog.author.equals(req.user.profile._id)) {
      blog.delete()
      .then(() => {
        res.redirect('/blogs')
      })
    } else {
      throw new Error('Not Authorized: User does not match BlogPost.author')
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect('/blogs/show')
  })
}

function addComment(req, res) {
  BlogPost.findById(req.params.id)
  .then(blog => {
    req.body.author = req.user.profile._id
    blog.comments.push(req.body)
    blog.save()
    .then(() => {
      res.redirect(`/blogs/${blog._id}`)
    })
    .catch(err => {
      console.log(err)
      res.redirect(`/blogs/${blog._id}`)
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/blogs')
  })
}

function editComment(req, res) {
  BlogPost.findById(req.params.blogId)
  .then(blog => {
    const commentDoc = blog.comments.id(req.params.commentId)
    if (commentDoc.author.equals(req.user.profile._id)) {
      res.render('blogs/editComment', {
        title: 'Edit Comment',
        blog,
        comment: commentDoc,
      })
    } else {
      throw new Error('Not Authorized: User does not match commentDoc.author')
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function updateComment(req, res) {
  BlogPost.findById(req.params.blogId)
  .then(blog => {
    const commentDoc = blog.comments.id(req.params.commentId)
    if (commentDoc.author.equals(req.user.profile._id)) {
      commentDoc.set(req.body)
      blog.save()
      .then(() => {
        res.redirect(`/blogs/${blog._id}`)
      })
      .catch(err => {
        console.log(err)
        res.redirect('/blogs')
      })
    } else {
      throw new Error('Not Authorized: User does not match commentDoc.author')
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect('/blogs')
  })
}



export {
  index,
  newBlog as new,
  create,
  show,
  edit,
  update,
  deleteBlog as delete,
  addComment,
  editComment,
  updateComment,
}

// console.log(req.body, 'req.body')
// console.log(req.params, 'req.params')