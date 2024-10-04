const express = require("express")
const bodyparser = require('body-parser')
const mainRouter = require("./routes")
const cors = require('cors');

const app = express()

const PORT = 2300

app.use(cors())

app.use(bodyparser.json())

app.use('/api/v1', mainRouter)

app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
})  
