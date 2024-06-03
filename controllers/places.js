const router = require('express').Router()
const db = require('../models')
const places = require('../models/places')

// New Route
router.get('/new', (req, res) => {
  res.render('places/new')
  })

  // Index Route
router.get('/', (req, res) => {
    db.Place.find()
    .then((places) => {
      res.render('places/index', {places})
    })
    .catch(err => {
      res.render('error404')
    })
})

// Post Places Route
router.post('/', (req, res) => {
  function remove(obj) {
    const result = {};
    for (const key in obj) {
      if (obj[key] !== "") {
        result[key] = obj[key];
      }
    }
    return result;
  }
  db.Place.create(remove(req.body))
  .then(() => {
      res.redirect('/places')
  })
  .catch(err => {
      console.log('err', err)
      res.render('error404')
  })
})

// Show Route
router.get('/:id', (req, res) => {
  db.Place.findById(req.params.id)
  .populate('comments')
  .then(place => {
      console.log(place.comments)
      res.render('places/show', { place })
  })
  .catch(err => {
      console.log('err', err)
      res.render('error404')
  })
})

// Create Comment
router.post("/:id/comment", (req, res) => {
  console.log(req.body);

  // Ensure that the stars field is correctly parsed as a number
  req.body.stars = parseFloat(req.body.stars);
  req.body.rant = req.body.rant ? true : false;

  db.Place.findById(req.params.id)
      .then((place) => {
          db.Comment.create(req.body)
              .then((comment) => {
                  place.comments.push(comment.id);
                  place
                      .save()
                      .then(() => {
                          res.redirect(`/places/${req.params.id}`);
                      })
                      .catch((err) => {
                          console.log(err);
                          res.render("error404");
                      });
              })
              .catch((err) => {
                  console.log(err);
                  res.render("error404");
              });
      })
      .catch((err) => {
          console.log(err);
          res.render("error404");
      });
});

// Places Get id Stub 
router.get('/:id', (req, res) => {
  res.send('GET /places/:id stub')
})

// Places put id Stub
router.put('/:id', (req, res) => {
  db.Place.findByIdAndUpdate(req.params.id, req.body)
      .then(() => {
          res.redirect(`/places/${req.params.id}`)
      })
      .catch(err => {
          console.log('err', err)
          res.render('error404')
      })
})

// Delete Route
router.delete('/:id', (req, res) => {
  db.Place.findByIdAndDelete(req.params.id)
  .then(place => {
      res.redirect('/places')
  })
  .catch(err => {
      console.log('err', err)
      res.render('error404')
  })
})


// Edit Route
router.get('/:id/edit', (req, res) => {
  db.Place.findById(req.params.id)
  .then(place => {
    res.render('places/edit', { place })
  })
  .catch(err => {
    res.render('error404')
  })
})

// Rant Route
router.post('/:id/rant', (req, res) => {
  res.send('GET /places/:id/rant stub')
})

// Delete Stub
router.delete('/:id/rant/:rantId', (req, res) => {
    res.send('GET /places/:id/rant/:rantId stub')
})

// Export
module.exports = router