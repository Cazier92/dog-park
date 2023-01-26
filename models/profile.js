import mongoose from 'mongoose'
import { v4 as uuidv4 } from 'uuid'

const Schema = mongoose.Schema


const profileSchema = new Schema({
  name: String,
  avatar: String,
  dogs: [{type: Schema.Types.ObjectId, ref: 'Dog'}],
  blogPosts: [{type: Schema.Types.ObjectId, ref: 'BlogPost'}],
  friendCode: {
    type: String,
    default: function() {
      return uuidv4().slice(0,8)
    }
  },
  friendRequests: [{type: String}],
  friends: [{type: Schema.Types.ObjectId, ref: 'Profile'}],
  friendConvos: [{type: Schema.Types.ObjectId, ref: 'Convo'}],
}, {
  timestamps: true
})

const Profile = mongoose.model('Profile', profileSchema)

export {
  Profile
}

