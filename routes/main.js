const apiRoutes = require('express').Router()
const Post = require('../models/Post')

apiRoutes.get('', (req, res) => {
   res.send("Hello Worlds !!!")
})

function insertPostData(){
    Post.insertMany([
        {
            title : "Building a Blog",
            body : "This is the body Text"
        },
        {
            title : "Building a Blog 2",
            body : "This is the body Text 2"
        }
    ])
}

insertPostData()

module.exports = apiRoutes