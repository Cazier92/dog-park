import { BlogPost } from "../models/blogPost.js";
import { Profile } from "../models/profile.js";

function index(req, res) {
  Profile.findById(req.params.id)
  .then(profile => {
    res.render('profile/index', {
      profile,
      title: `Profile`
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