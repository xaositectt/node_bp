import mongoose from 'mongoose'

const User = mongoose.Schema({
  email: String,
  hash: String,
  salt: String,
}, {
  timestamps: true
})

export default mongoose.model('User', User)
