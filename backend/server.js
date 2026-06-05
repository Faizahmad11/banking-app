const {config} = require("dotenv")
config({
    path: ".env"
})
const app = require("./src/app")
const { connectDB } = require("./src/config/db.config")
const port = process.env.PORT || 3000
connectDB();

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})