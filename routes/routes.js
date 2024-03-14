const apiRoutes = require('express').Router()

apiRoutes.get('', (req, res) => {
    res.send("Hello Worlds!!");
})

module.exports = apiRoutes