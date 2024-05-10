const router = require('express').Router()
const places = require('../models/places.js')

router.get('/', (req, res) => {
    res.render('places/index', {places})
})

router.get('/new', (req, res) => {
    res.render('places/new')
  })
  
  router.get('/:id', (req, res) => {
    res.render('places/show')
  })


  router.post('/', (req, res) => {
    console.log(req.body)
    if (!req.body.pic) {
      // Default image if one is not provided
      req.body.pic = 'http://placekitten.com/400/400'
    }
    if (!req.body.city) {
        // default to Anytown if none provided
      req.body.city = 'Anytown'
    }
    if (!req.body.state) {
        //default to USA
      req.body.state = 'USA'
    }
    places.push(req.body)
    res.redirect('/places')
  })
  
  
module.exports = router
