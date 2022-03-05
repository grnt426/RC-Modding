const axios = require('axios')
payload = {type:"skldjfklj", thing:"Hello"};

axios
    .post('http://localhost:8080/update', {
        data: JSON.stringify(payload)
    })
    .then(res => {
        console.log(`statusCode: ${res.status}`)
        console.log(res)
    })
    .catch(error => {
        console.error(error)
    })