import axios from 'axios'

function randomDog (req, res) {
  axios.get(`https://dog.ceo/api/breeds/image/random`)
  .then(response => {
    res.render('index', {
      title: 'Home Page',
      randomDog: response.data.message
    })
  })
}

export {
  randomDog
}