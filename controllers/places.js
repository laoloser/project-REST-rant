const router = require('express').Router()
const places = require('../models/places.js')

router.get('/', (req, res) => {
    res.render('places/index', {places})
})

router.get('/new', (req, res) => {
    res.render('places/new')
  })
  

  router.get("/:id", (req, res) => {
    let id = Number(req.params.id);
    if (isNaN(id)) { 
      res.render("error404");
    } else if (!places[id]) { 
      res.render("error404");
    } else { 
      res.render("places/show", { place: places[id], id: id }); 
    } 
  });
  
  router.put('/:id', (req, res) => {
    let i = Number(req.params.id)
    if (isNaN(i)) {
        res.render('error404')
    }
    else if (!places[i]) {
        res.render('error404')
    }
    else {
        // Dig into req.body and make sure data is valid
        if (!req.body.pic) {
            // Default image if one is not provided
            req.body.pic = 'http://placekitten.com/400/400'
        }
        if (!req.body.city) {
            req.body.city = 'Anytown'
        }
        if (!req.body.state) {
            req.body.state = 'USA'
        }
  
        // Save the new data into places[id]
        places[i] = req.body
        res.redirect(`/places/${i}`)
    }
  })
  
  

  router.get('/:id/edit', (req, res) => {
    let i = Number(req.params.id)
    if (isNaN(i)) {
        res.render('error404')
    }
    else if (!places[i]) {
        res.render('error404')
    }
    else {
      res.render('places/edit', { place: places[i], i})
    }
  })

  router.delete('/:id', (req, res) => {
    let id = Number(req.params.id)
    if (isNaN(id)) {
      res.render('error404')
    }
    else if (!places[id]) {
      res.render('error404')
    }
    else {
      places.splice(id, 1)
      res.redirect('/places')
    }
  })
  
  


  router.post('/', (req, res) => {
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
