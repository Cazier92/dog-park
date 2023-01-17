import mongoose, { trusted } from 'mongoose'

const Schema = mongoose.Schema



const dogSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  breed: {
    type: String,
    required: true
  },
  color: {
    type: String
  },
  age: {
    type: String
  },
  owner: {type: Schema.Types.ObjectId, ref: 'Profile'},
}, {
  timestamps: true
})

const Dog = mongoose.model('Dog', dogSchema)

export {
  Dog
}