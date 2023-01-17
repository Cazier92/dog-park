import { Dog } from "../models/dog.js";
import { Profile } from "../models/profile.js";

function index(req, res) {
  Dog.find({})
  .then(dogs => {
    res.render('dogs/index', {
      dogs,
      title: 'Dogs'
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function newDog(req, res) {
  console.log(req.body, 'req.body')
  console.log(req.params, 'req.params')
  res.render('dogs/new', {
    title: 'Add New Dog',
  })
}

function create(req, res) {
  console.log(req.body, 'req.body')
  console.log(req.params, 'req.params')
  req.body.owner = req.user.profile._id
  Dog.create(req.body)
  .then(dog => {
    Profile.findById(req.user.profile._id)
    .then(profile => {
      profile.dogs.push(dog._id)
      profile.save()
      .then(() => {
        res.redirect(`profile/${profile._id}`)
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
  Dog.findById(req.params.id)
  .populate('owner')
  .then(dog => {
    res.render('dogs/show', {
      title: dog.name,
      dog
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/dogs')
  })
}

export {
  index,
  newDog as new,
  create,
  show,
}
