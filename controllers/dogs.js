import { Dog } from "../models/dog.js";
import { Profile } from "../models/profile.js";

function index(req, res) {
  Dog.find({})
  .then(dogs => {
    res.render('dogs/index', {
      dogs,
      title: 'Dogs',
      breedList: dogBreeds(dogs)
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
    console.log(dog, 'dog')
    console.log(dog.breed, 'dog.breed')
    console.log(typeof dog.breed)
    // const dogBreed = dog.breed
    if (dogBreedArr.includes(dog.breed) === false) {
      dogBreedArr.push(dog.breed)
    }
  })
  console.log(dogBreedArr)
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
      title: 'Edit Dog Info',
      dog
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/dogs/show')
  })
}

function update(req, res) {
  Dog.findById(req.params.id)
  .then(dog => {
    if (dog.owner.equals(req.user.profile._id)) {
      dog.updateOne(req.body)
      .then(() => {
        res.redirect(`/dogs/${dog._id}`)
      })
    } else {
      throw new Error('Not Authorized: User does not match dog.owner')
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect('/dogs/show')
  })
}

function deleteDog(req, res) {
  Dog.findById(req.params.id)
  .then(dog => {
    if (dog.owner.equals(req.user.profile._id)) {
      dog.delete()
      .then(() => {
        res.redirect('/dogs')
      })
    } else {
      throw new Error('Not Authorized: User does not match dog.owner')
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect('/dogs/show')
  })
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
