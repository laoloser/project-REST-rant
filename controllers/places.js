const router = require('express').Router()

router.get('/', (req, res) => {
    res.render('GET /places/index')
})

module.exports = router
