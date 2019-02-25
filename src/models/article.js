import mongoose from 'mongoose'

const articleSchema = mongoose.Schema({
  title: String,
  content: String
}, {
  timestamps: true
})

export default mongoose.model('Note', articleSchema)
