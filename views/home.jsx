const React = require('react')
const Def = require('./default')

function home () {
    return (
      <Def>
          <main>
              <h1>HOME</h1>
              <div>
                <img src="public/images/food3.jpeg" alt="Food photo" />
                <div>
                Photo by <a href="https://unsplash.com/@briewilly?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Chad Montano</a> on <a href="https://unsplash.com/photos/burgers--GFCYhoRe48?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
                </div>
              </div>
              <a href="/places">
  <button className="btn-primary">Places Page</button>
</a>

          </main>
      </Def>
    )
  }
  

module.exports = home

