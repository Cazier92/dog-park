import mongoose from 'mongoose'

const Schema = mongoose.Schema

const dogSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  breed: {
    type: String,
    required: true,
  },
  color: {
    type: String,
  }
}, {
  timestamps: true
})

const profileSchema = new Schema({
  name: String,
  avatar: String,
  dogs: [dogSchema],
  blogPosts: [{type: Schema.Types.ObjectId, ref: 'BlogPost'}],
}, {
  timestamps: true
})

const Profile = mongoose.model('Profile', profileSchema)

export {
  Profile
}
