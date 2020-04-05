import axios from 'axios'

export default axios.create({
    baseURL: 'https://quiz-e8a62.firebaseio.com/'
})