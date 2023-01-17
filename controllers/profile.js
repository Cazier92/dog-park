import { BlogPost } from "../models/blogPost.js";
import { Profile } from "../models/profile.js";

function show(req, res) {
  Profile.findById(req.params.id)
  .populate('blogPosts')
  .populate('dogs')
  .then(profile => {
    res.render('profile/show', {
      profile,
      title: `${profile.name}`
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function newDog(req, res) {
  Profile.findById(req.params.id)
  .then(profile => {
    res.render('profile/new', {
      profile,
      title: 'Add New Dog'
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/profile')
  })
}

function edit(req, res) {
  Profile.findById(req.params.id)
  .then(profile => {
    res.render('profile/edit', {
      profile,
      title: 'Edit Profile'
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/profile')
  })
}


function createDog(req, res) {
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key]
  }
  Profile.findById(req.params.id)
  .then(profile => {
    profile.dogs.push(req.body)
    profile.save()
    .then(() => {
      res.redirect(`/profile/${profile._id}`)
    })
    .catch(err => {
      console.log(err)
      res.redirect('/')
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/profile')
  })
}

function updateDogs(req, res) {
  console.log(req.body, 'req.body')
  console.log(req.params, 'req.params')
  
}

// function editComment(req, res) {
//   BlogPost.findById(req.params.blogId)
//   .then(blog => {
//     const commentDoc = blog.comments.id(req.params.commentId)
//     if (commentDoc.author.equals(req.user.profile._id)) {
//       res.render('blogs/editComment', {
//         title: 'Edit Comment',
//         blog,
//         comment: commentDoc,
//       })
//     } else {
//       throw new Error('Not Authorized: User does not match commentDoc.author')
//     }
//   })
//   .catch(err => {
//     console.log(err)
//     res.redirect('/')
//   })
// }


export {
  show,
  edit,
  newDog as new,
  createDog,
  updateDogs,
}

// console.log(req.body, 'req.body')
// console.log(req.params, 'req.params')