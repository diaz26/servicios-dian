import mongoose from "mongoose"

let db = mongoose.connection
db.on('open', () => console.log('DB connected'))

db.on('error', function (error) {
  console.error(`[MongoDB connection error:]`, error.message)
  process.exit(0)
})

const connectDB = (dbConfig: any) => {
  const uri = `mongodb://${dbConfig.host}:${dbConfig.port}/${dbConfig.DBname}`
  mongoose.connect(uri)

}

export default connectDB