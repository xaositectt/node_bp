import mongoose from 'mongoose'

mongoose.Promise = global.Promise

export default function(dbUrl) {
  return mongoose.connect(dbUrl, {
    useNewUrlParser: true
  }).then(() => {
    console.log("Successfully connected to the database");    
  }).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err)
    process.exit()
  })
}
