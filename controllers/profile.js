import { BlogPost } from "../models/blogPost.js";
import { Profile } from "../models/profile.js";

function show(req, res) {
  Profile.findById(req.params.id)
  .populate('blogPosts')
  .populate('dogs')
  .then(profile => {
    if (profile._id.equals(req.user.profile._id)) {
      res.render('profile/show', {
        profile,
        title: `${profile.name}`
      })
    } else {
      Profile.findById(req.user.profile._id)
      .then(userProfile => {
        res.render('profile/show', {
          profile,
          userProfile,
          title: `${profile.name}`
        })
      })
    }
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
        title: 'Friend Code',
        message: ''
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
  Profile.findById(req.params.userId)
  .then(userProfile => {
    Profile.findById(req.params.globalProfileId)
    .then(friendProfile => {
      userProfile.friends.push(friendProfile._id)
      friendProfile.friends.push(userProfile._id)
      let friendCodeId = friendProfile.friendCode
      let friendRequestArr = userProfile.friendRequests
      friendRequestArr.splice((friendRequestArr.indexOf(friendCodeId)), 1)
      userProfile.save()
      friendProfile.save()
      .then(() => {
        res.redirect(`/profile/${friendProfile._id}`)
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

function addFriendByCode(req, res) {
  Profile.findById(req.params.id)
  .then(userProfile => {
    Profile.find({})
    .then(globalProfiles => {
      globalProfiles.forEach(globalProfile => {
        if (globalProfile.friendCode === req.body.friendCode && userProfile.friends.includes(globalProfile._id) === false) {
          userProfile.friends.push(globalProfile._id)
          globalProfile.friends.push(userProfile._id)
          userProfile.save()
          globalProfile.save()
          .then(() => {
            res.redirect(`/profile/${userProfile._id}`)
          })
          .catch(err => {
            console.log(err)
            res.redirect('/')
          })
        } else if (userProfile.friends.includes(globalProfile._id)){
          res.render(`profile/friendCode`, {
            title: 'Friend Code',
            profile: userProfile,
            message: `Error: Already Friends with ${globalProfile.name}`
          })
        }
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

function showFriends(req, res) {
  Profile.findById(req.params.id)
  .populate('friends')
  .then(profile => {
    if (profile._id.equals(req.user.profile._id)) {
      res.render(`profile/friends`, {
        title: 'Your Friends',
        profile
      })
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
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
  addFriendByCode,
  showFriends,
}

// console.log(req.body, 'req.body')
// console.log(req.params, 'req.params')