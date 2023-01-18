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

function friendCode(req, res) {
  Profile.findById(req.params.id)
  .then(profile => {
    if (profile._id.equals(req.user.profile._id)) {
      res.render('profile/friendCode', {
        profile,
        title: 'Friend Code'
      })
    } else {
      throw new Error('Not Authorized: user does not match profile._id')
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect('/profile')
  })
}

function friendRequests(req, res) {
  Profile.findById(req.params.id)
  .then(userProfile => {
    Profile.find({})
    .then(globalProfiles => {
      if (userProfile._id.equals(req.user.profile._id)) {
        res.render('profile/friendRequests', {
          userProfile,
          globalProfiles,
          title: 'Friend Requests'
        })
      } else {
        throw new Error('Not Authorized: user does not match profile._id')
      }
    })
    .catch(err => {
      console.log(err)
      res.redirect('/profile')
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/profile')
  })
}

function sendFriendRequest(req, res) {
  Profile.findById(req.params.id)
  .then(profile => {
    Profile.findById(req.user.profile._id)
    .then(userProfile => {
      profile.friendRequests.push(userProfile.friendCode)
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
      res.redirect('/')
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function addFriend(req, res) {
  // console.log(req.body, 'req.body')
  // console.log(req.params, 'req.params')
  Profile.findById(req.params.userId)
  .then(userProfile => {
    Profile.findById(req.params.globalProfileId)
    .then(friendProfile => {
      console.log(userProfile._id, 'user profile')
      console.log(friendProfile._id, 'friendProfile')
      userProfile.friends.push(friendProfile._id)
      friendProfile.friends.push(userProfile._id)
      let friendCodeId = friendProfile.friendCode
      let friendRequestArr = userProfile.friendRequests
      console.log(friendRequestArr.indexOf(friendCodeId))
      friendRequestArr.splice((friendRequestArr.indexOf(friendCodeId)), 1)
      // console.log(userProfile.friendRequests.IndexOf('e1ecc000'))
      userProfile.save()
      friendProfile.save()
      .then(() => {
        res.redirect(`/profile/${friendProfile._id}`)
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

function findFriendRequestCode(userProfile, friendProfile) {
  let friendCodeId = friendProfile.friendCode
  let friendRequestIdx = userProfile.friendRequests.IndexOf(friendCodeId)
  console.log(friendRequestIdx)
}

export {
  show,
  edit,
  newDog as new,
  createDog,
  updateDogs,
  friendCode,
  friendRequests,
  sendFriendRequest,
  addFriend,
}

// console.log(req.body, 'req.body')
// console.log(req.params, 'req.params')