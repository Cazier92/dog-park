import mongoose, { trusted } from 'mongoose'

const Schema = mongoose.Schema

const messageSchema = new Schema({
  author: {type: Schema.Types.ObjectId, ref: 'Profile'},
  content: {
    type: String,
    required: true,
  }
}, {
  timestamps: true
})

const conversationSchema = new Schema({
  title: String,
  chatMembers: [{type: Schema.Types.ObjectId, ref: 'Profile'}],
  content: [messageSchema]
}, {
  timestamps: true
})

const Convo = mongoose.model('Convo', conversationSchema)

export {
  Convo
}