const express = require('express')
const NotFoundError = require('./middleware/404Handling')
const ApiError = require('./utils/ApiError')
const app = express()
const morgan = require('morgan')
const cors =require('cors')


// #json parsing
app.use(express.json())
app.use(morgan("dev"))
app.use(cors())

app.use("/api/v1",require('./router'))

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use("",(res,req, next)=>{
  next( new ApiError(404,"Not Found"))
})
app.use(NotFoundError)


module.exports = app