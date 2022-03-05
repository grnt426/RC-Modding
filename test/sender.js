const axios = require('axios')
var XMLHttpRequest = require('xhr2');
payload = {type:"skldjfklj", thing:"Hello"};

axios
    .get('http://localhost:8080/init', {
        data: JSON.stringify(payload)
    })
    .then(res => {
        console.log(`statusCode: ${res.status}`)
        // console.log(res)
    })
    .catch(error => {
        console.error(error)
    })

let xhr = new XMLHttpRequest();
xhr.open("GET", "http://localhost:8080" + "/init");
xhr.onreadystatechange = function() {
    if (xhr.readyState == XMLHttpRequest.DONE) {
        console.info(xhr.responseText);
    }
}
xhr.timeout = 2000;
xhr.send();