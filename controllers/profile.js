import { BlogPost } from "../models/blogPost.js";
import { Profile } from "../models/profile.js";

function show(req, res) {
  Profile.findById(req.params.id)
  .populate('blogPosts')
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
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key]
  }
  Profile.findByIdAndUpdate(req.params.id, req.body, {new: true})
  .then(profile => {
    profile.save()
    .then(profile => {
      res.redirect(`/profile/${profile._id}`)
    })
        .catch(err => {
      console.log(err)
      res.redirect('/')
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/profile/show')
  })
}


export {
  show,
  edit,
  createDog,
  updateDogs,
}

// console.log(req.body, 'req.body')
// console.log(req.params, 'req.params')