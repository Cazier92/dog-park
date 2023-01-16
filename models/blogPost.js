import mongoose, { trusted } from 'mongoose'

const Schema = mongoose.Schema

const commentSchema = new Schema({
  author: {type: Schema.Types.ObjectId, ref: 'Profile'},
  content: {
    type: String,
    required: true,
  }
})

const blogSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {type: Schema.Types.ObjectId, ref: 'Profile'},
  comments: [commentSchema],
  photoUrl: String,
}, {
  timestamps: true
})

const BlogPost = mongoose.model('BlogPost', blogSchema)

export {
  BlogPost
}
