const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.send('Hi from node js')
});

const port = 8000

app.listen(port, () => {
    console.log(`App is running on port ${port}`)
})