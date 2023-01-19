import { Convo } from "../models/convo.js";
import { Profile } from "../models/profile.js";

function index(req, res) {
  Profile.findById(req.params.id)
  .populate('friends')
  .then(profile => {
    res.render('convo/index', {
      title: 'Messages',
      profile
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function show(req, res) {
  // Convo.find({})
  // .then(convos => {
  //   convos.forEach(convo => {
  //     if (convo.chatMembers.includes(req.params.userId) && convo.chatMembers.includes(req.params.friendId)) {
  //       res.render('convo/show')
  //     }
  //   })
  // })
}

function create(req, res) {
  Profile.findById(req.params.userId)
  .then(userProfile => {
    Profile.findById(req.params.friendId)
    .then(friendProfile => {
      req.body.chatMembers = [userProfile._id, friendProfile._id],
      req.body.title = `Conversation between ${userProfile.name} & ${friendProfile.name}`
      Convo.create(req.body)
      .then(convo => {
        res.render('convo/show', {
          userProfile,
          friendProfile,
          convo,
          title: `${convo.title}`,
        })
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
  show,
  create,
}