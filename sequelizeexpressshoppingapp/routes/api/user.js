const route = require('express').Router()
const user = require('../../db/connection').user

route.get('/', (req, res) => {
    user.findAll()
        .then((users) => {
            res.status(200).send(users)
        })
        .catch((err) => {
            res.status(500).send({
                error: "Could not retrive users"
            })
        })

})
route.post('/', (req, res) => {
    user.create({
        name: req.body.name
    }).then((user) => {
        res.status(201).send(user)
    }).catch((err) => {
        res.status(501).send({
            error: "could not add name"
        })
    })
})

module.exports = {
    route
}