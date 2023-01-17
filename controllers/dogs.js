import { Dog } from "../models/dog.js";
import { Profile } from "../models/profile.js";

function index(req, res) {
  Dog.find({})
  .then(dogs => {
    res.render('dogs/index', {
      dogs,
      title: 'Dogs',
      // breedList: dogBreeds(dogs)
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function dogBreeds(dogs) {
  let dogBreedArr = []
  dogs.forEach(dog => {
    const dogBreed = dog.breed
    if (dogBreedArr.some(dogBreed) === false) {
      dogBreedArr.push(dog.breed)
    }
  })
  return dogBreedArr
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

function edit(req, res) {
  Dog.findById(req.params.id)
  .then(dog => {
    res.render('dogs/edit', {
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

}

function deleteDog(req, res) {

}

export {
  index,
  newDog as new,
  create,
  show,
  edit,
  update,
  deleteDog as delete,
}
